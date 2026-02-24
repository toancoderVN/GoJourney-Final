import fs from 'fs';
import path from 'path';
class DeepResearchLogger {
    logsDir;
    currentSession = null;
    constructor() {
        this.logsDir = path.join(process.cwd(), 'logs', 'deep-research');
        this.ensureLogsDirectory();
    }
    ensureLogsDirectory() {
        if (!fs.existsSync(this.logsDir)) {
            fs.mkdirSync(this.logsDir, { recursive: true });
        }
    }
    startSession(query) {
        const now = new Date();
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();
        const hour = now.getHours().toString().padStart(2, '0');
        const minute = now.getMinutes().toString().padStart(2, '0');
        const stt = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        const sessionId = `${day}_${month}_${year}_${hour}${minute}_deep_research_logs_${stt}`;
        const timestamp = new Date().toISOString();
        this.currentSession = {
            timestamp,
            sessionId,
            query,
            events: []
        };
        this.logEvent('SESSION_START', { query });
        return sessionId;
    }
    logEvent(type, data) {
        if (!this.currentSession)
            return;
        this.currentSession.events.push({
            timestamp: new Date().toISOString(),
            type,
            data
        });
        // Auto-save every 10 events to prevent data loss
        if (this.currentSession.events.length % 10 === 0) {
            this.saveCurrentSession();
        }
    }
    endSession(finalResult) {
        if (!this.currentSession)
            return;
        this.currentSession.finalResult = finalResult;
        this.logEvent('SESSION_END', finalResult);
        this.saveCurrentSession();
        this.currentSession = null;
    }
    saveCurrentSession() {
        if (!this.currentSession)
            return;
        const filename = `${this.currentSession.sessionId}.json`;
        const filepath = path.join(this.logsDir, filename);
        try {
            fs.writeFileSync(filepath, JSON.stringify(this.currentSession, null, 2), 'utf8');
            console.log(`💾 Deep research log saved: ${filename}`);
        }
        catch (error) {
            console.error('❌ Failed to save deep research log:', error);
        }
    }
    // Get logs for a specific date
    getLogsByDate(date) {
        try {
            const files = fs.readdirSync(this.logsDir);
            const logs = [];
            for (const file of files) {
                if (file.endsWith('.json')) {
                    const filepath = path.join(this.logsDir, file);
                    const logData = JSON.parse(fs.readFileSync(filepath, 'utf8'));
                    // Check if log is from the specified date
                    const logDate = new Date(logData.timestamp).toISOString().split('T')[0];
                    if (logDate === date) {
                        logs.push(logData);
                    }
                }
            }
            return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        }
        catch (error) {
            console.error('❌ Failed to get logs by date:', error);
            return [];
        }
    }
    // Get recent logs
    getRecentLogs(limit = 10) {
        try {
            const files = fs.readdirSync(this.logsDir);
            const logs = [];
            for (const file of files) {
                if (file.endsWith('.json')) {
                    const filepath = path.join(this.logsDir, file);
                    const logData = JSON.parse(fs.readFileSync(filepath, 'utf8'));
                    logs.push(logData);
                }
            }
            return logs
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .slice(0, limit);
        }
        catch (error) {
            console.error('❌ Failed to get recent logs:', error);
            return [];
        }
    }
}
// Export singleton instance
export const deepResearchLogger = new DeepResearchLogger();
//# sourceMappingURL=deepResearchLogger.js.map