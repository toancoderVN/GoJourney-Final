import React, { useState, useEffect } from 'react';
import {
  Badge,
  Button,
  Dropdown,
  List,
  Typography,
  Space,
  Avatar,
  Empty,
  Spin,
  message,
  notification,
} from 'antd';
import {
  BellOutlined,
  UserAddOutlined,
  CarOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { notificationApi, type Notification } from '../services/notificationService';
import { travelCompanionApi } from '../services/travelCompanionService';
import webSocketService from '../services/webSocketService';
import { showPushNotification } from '../services/pushNotificationService';
import { useTheme } from '../contexts/ThemeContext';

const { Text } = Typography;

interface NotificationBellProps {
  style?: React.CSSProperties;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({ style }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    console.log('🔔 NotificationBell useEffect - Setting up WebSocket listeners');
    loadUnreadCount();
    
    // Check if WebSocket is connected
    if (!webSocketService.isConnected()) {
      console.warn('⚠️ WebSocket not connected yet, waiting for connection...');
    }
    
    // Set up WebSocket listeners for real-time notifications
    const unsubscribeNewInvitation = webSocketService.onNewInvitation((data) => {
      console.log('🔔 New invitation notification received:', data);
      
      // Add notification to local state immediately
      const newNotification: Notification = {
        id: data.id,
        userId: data.userId || '',
        type: data.type,
        title: data.title,
        message: data.message,
        status: 'unread',
        createdAt: data.createdAt,
        relatedEntityId: data.id,
        metadata: data.sender ? { sender: data.sender } : undefined
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      setUnreadCount(prev => prev + 1);
      
      // Show push notification
      showPushNotification({
        type: 'invitation',
        title: data.title,
        message: data.message,
        onClick: () => setDropdownVisible(true)
      });
    });

    const unsubscribeNotification = webSocketService.onNotification((data) => {
      console.log('🔔 General notification received:', data);
      
      // Handle general notifications
      const newNotification: Notification = {
        id: data.id,
        userId: data.userId || '',
        type: data.type,
        title: data.title,
        message: data.message,
        status: 'unread',
        createdAt: data.createdAt || new Date().toISOString(),
        relatedEntityId: data.relatedEntityId,
        metadata: data.metadata
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      setUnreadCount(prev => prev + 1);
      
      // Only show push notification for certain types, not for companion_removed 
      // (UserManagementPage handles companion_removed notifications)
      if (data.type !== 'companion_removed' && data.type !== 'invitation_accepted') {
        showPushNotification({
          type: 'general',
          title: data.title,
          message: data.message,
          notificationType: data.type,
          onClick: () => setDropdownVisible(true)
        });
      }
    });

    const unsubscribeInvitationAccepted = webSocketService.onInvitationAccepted((data) => {
      console.log('✅ Invitation accepted:', data);
      
      // Show push notification
      showPushNotification({
        type: 'accepted',
        title: 'Lời mời được chấp nhận!',
        message: data.message || 'Có người vừa chấp nhận lời mời kết nối của bạn',
        onClick: () => setDropdownVisible(true)
      });
      
      // Refresh notifications and count
      loadUnreadCount();
      if (dropdownVisible) {
        loadNotifications();
      }
    });

    return () => {
      unsubscribeNewInvitation();
      unsubscribeNotification();
      unsubscribeInvitationAccepted();
    };
  }, [dropdownVisible]);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const data = await notificationApi.getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUnreadCount = async () => {
    try {
      // Temporarily disabled API call - set to 0 unless there are real notifications
      // const { count } = await notificationApi.getUnreadCount();
      // setUnreadCount(count || 0);
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to load unread count:', error);
      // Set to 0 if API fails
      setUnreadCount(0);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await notificationApi.markAsRead(notificationId);
      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId ? { ...n, status: 'read' as const } : n
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationApi.markAllAsRead();
      setNotifications(prev => 
        prev.map(n => ({ ...n, status: 'read' as const }))
      );
      setUnreadCount(0);
      message.success('Đã đánh dấu tất cả thông báo đã đọc');
    } catch (error) {
      console.error('Failed to mark all as read:', error);
      message.error('Có lỗi xảy ra');
    }
  };

  const handleDeleteNotification = async (notificationId: string) => {
    try {
      await notificationApi.deleteNotification(notificationId);
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
      message.success('Đã xóa thông báo');
    } catch (error) {
      console.error('Failed to delete notification:', error);
      message.error('Có lỗi xảy ra');
    }
  };

  const handleAcceptInvitation = async (notification: Notification) => {
    try {
      if (notification.type === 'companion_invitation') {
        await travelCompanionApi.acceptInvitation({
          invitationId: notification.relatedEntityId!,
          relationship: 'friend' // Use valid enum value
        });
        await handleMarkAsRead(notification.id);
        message.success('Đã chấp nhận lời mời!');
        
        // Force immediate refresh
        loadUnreadCount();
        loadNotifications();
      } else if (notification.type === 'trip_invitation') {
        await travelCompanionApi.acceptTripInvitation(notification.relatedEntityId!);
        await handleMarkAsRead(notification.id);
        message.success('Đã chấp nhận lời mời tham gia chuyến đi');
      }
    } catch (error) {
      console.error('Failed to accept invitation:', error);
      message.error('Có lỗi xảy ra');
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'companion_invitation':
        return <UserAddOutlined style={{ color: '#1890ff' }} />;
      case 'trip_invitation':
        return <CarOutlined style={{ color: '#52c41a' }} />;
      case 'companion_accepted':
      case 'trip_accepted':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      default:
        return <BellOutlined />;
    }
  };

  const renderNotificationActions = (notification: Notification) => {
    const actions = [];

    // Chấp nhận lời mời
    if (['companion_invitation', 'trip_invitation'].includes(notification.type)) {
      actions.push(
        <Button
          key="accept"
          type="primary"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleAcceptInvitation(notification);
          }}
        >
          Chấp nhận
        </Button>
      );
    }

    // Đánh dấu đã đọc
    if (notification.status === 'unread') {
      actions.push(
        <Button
          key="read"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleMarkAsRead(notification.id);
          }}
        >
          Đánh dấu đã đọc
        </Button>
      );
    }

    // Xóa
    actions.push(
      <Button
        key="delete"
        type="text"
        size="small"
        icon={<DeleteOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          handleDeleteNotification(notification.id);
        }}
      />
    );

    return actions;
  };

  const dropdownContent = (
    <div style={{ 
      width: 380, 
      maxHeight: 480, 
      backgroundColor: isDark ? '#1e293b' : '#fff',
      borderRadius: '8px',
      boxShadow: isDark 
        ? '0 6px 16px 0 rgba(0, 0, 0, 0.3), 0 3px 6px -4px rgba(0, 0, 0, 0.4), 0 9px 28px 8px rgba(0, 0, 0, 0.2)'
        : '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden',
      border: isDark ? '1px solid #334155' : '1px solid #f0f0f0'
    }}>
      {/* Header */}
      <div style={{ 
        padding: '16px 20px', 
        borderBottom: isDark ? '1px solid #334155' : '1px solid #f0f0f0',
        backgroundColor: isDark ? '#0f172a' : '#fafafa',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ 
          fontSize: '16px', 
          fontWeight: 600, 
          color: isDark ? '#f1f5f9' : '#262626' 
        }}>
          Thông báo
        </span>
        {unreadCount > 0 && (
          <Button 
            type="link" 
            size="small" 
            onClick={handleMarkAllAsRead}
            style={{ 
              fontSize: '13px',
              padding: '0 8px',
              height: 'auto'
            }}
          >
            Đánh dấu tất cả đã đọc
          </Button>
        )}
      </div>
      
      {/* Content */}
      <div style={{ 
        maxHeight: '400px', 
        overflowY: 'auto' 
      }}>
        <Spin spinning={loading}>
          {notifications.length === 0 ? (
            <Empty
              description="Không có thông báo nào"
              style={{ 
                padding: '40px 20px',
                backgroundColor: isDark ? '#1e293b' : '#fff',
                color: isDark ? '#94a3b8' : '#8c8c8c'
              }}
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ) : (
          <List
            dataSource={notifications}
            renderItem={(notification) => (
              <div
                style={{
                  padding: '16px',
                  borderBottom: isDark ? '1px solid #334155' : '1px solid #f0f0f0',
                  backgroundColor: notification.status === 'unread' 
                    ? (isDark ? '#0f172a' : '#f6ffed')
                    : (isDark ? '#1e293b' : '#fff'),
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  display: 'flex',
                  gap: '12px',
                  alignItems: 'flex-start'
                }}
              >
                {/* Avatar */}
                <Avatar
                  size={40}
                  icon={getNotificationIcon(notification.type)}
                  style={{ 
                    backgroundColor: notification.status === 'unread' ? '#1890ff' : '#d9d9d9',
                    flexShrink: 0
                  }}
                />
                
                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Title */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    marginBottom: '4px'
                  }}>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: notification.status === 'unread' ? 600 : 400,
                      color: isDark ? '#f1f5f9' : '#262626',
                      lineHeight: '1.4',
                      wordBreak: 'break-word'
                    }}>
                      {notification.title}
                    </span>
                    {notification.status === 'unread' && (
                      <span style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#ff4d4f',
                        borderRadius: '50%',
                        flexShrink: 0
                      }} />
                    )}
                  </div>
                  
                  {/* Message */}
                  <div style={{
                    fontSize: '13px',
                    color: isDark ? '#94a3b8' : '#8c8c8c',
                    lineHeight: '1.4',
                    marginBottom: '8px',
                    wordBreak: 'break-word'
                  }}>
                    {notification.message}
                  </div>
                  
                  {/* Time */}
                  <div style={{
                    fontSize: '12px',
                    color: isDark ? '#64748b' : '#bfbfbf',
                    marginBottom: '12px'
                  }}>
                    {new Date(notification.createdAt).toLocaleString('vi-VN')}
                  </div>
                  
                  {/* Actions */}
                  <div style={{ 
                    display: 'flex', 
                    gap: '8px',
                    flexWrap: 'wrap'
                  }}>
                    {renderNotificationActions(notification).map((action, index) => (
                      <div key={index}>{action}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          />
          )}
        </Spin>
      </div>
    </div>
  );  return (
    <Dropdown
      dropdownRender={() => dropdownContent}
      trigger={['click']}
      open={dropdownVisible}
      onOpenChange={setDropdownVisible}
      placement="bottomRight"
    >
      <Badge count={unreadCount} showZero={false} size="small">
        <Button
          type="text"
          icon={<BellOutlined />}
          style={{ 
            fontSize: '16px',
            color: isDark ? '#e2e8f0' : '#64748b',
            ...style
          }}
        />
      </Badge>
    </Dropdown>
  );
};