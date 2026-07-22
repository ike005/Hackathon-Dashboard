import {forwardRef} from "react";
import type {CSSProperties} from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useTheme} from "@mui/material/styles";
import {useAllUsersReport} from "../../hooks/useAllUsersReport.ts";
import {
    buildReportFromServerData,
    buildReportMetricsFromServerData,
    displayValue,
    formatReportDate,
    normalizeUserId,
    toTextList,
} from "../../utils/handleDownload/generalDownloadFeature.ts";
import {overallDominantFeeling} from "../../utils/feelingLogic.ts"
import {useDailyLog} from "../../hooks/useDailyLog.ts";

function getReportStyles(isMobile: boolean, isCompact: boolean, forceDesktop = false): Record<string, CSSProperties> {
    const useDesktopLayout = forceDesktop || (!isMobile && !isCompact);

    return {
        root: {
            width: "100%",
            maxWidth: "72rem",
            minWidth: forceDesktop ? "72rem" : undefined,
            margin: "0 auto",
            padding: useDesktopLayout ? "32px" : isMobile ? "16px" : "24px",
            backgroundColor: "#ffffff",
            color: "#000000",
            fontFamily: "Georgia, serif",
            fontSize: useDesktopLayout ? "14px" : isMobile ? "13px" : "14px",
            lineHeight: 1.5,
            boxSizing: "border-box",
            overflowX: "hidden",
        },
        header: {
            marginBottom: useDesktopLayout ? "40px" : isMobile ? "28px" : "40px",
        },
        title: {
            margin: "0 0 20px",
            textAlign: "center",
            fontSize: useDesktopLayout ? "2.625rem" : isMobile ? "1.75rem" : "2.125rem",
            fontWeight: 700,
            color: "#022156",
            letterSpacing: "1px",
        },
        generatedRow: {
            display: "flex",
            flexDirection: useDesktopLayout ? "row" : isMobile ? "column" : "row",
            alignItems: "center",
            gap: useDesktopLayout ? "24px" : isMobile ? "12px" : "24px",
        },
        line: {
            flex: 1,
            border: "none",
            borderTop: "1px solid #022156",
            margin: 0,
            display: useDesktopLayout ? "block" : isMobile ? "none" : "block",
            width: isMobile && !forceDesktop ? "100%" : undefined,
        },
        generatedText: {
            margin: 0,
            fontSize: useDesktopLayout ? "18px" : isMobile ? "16px" : "18px",
            fontWeight: 600,
            whiteSpace: useDesktopLayout ? "nowrap" : isMobile ? "normal" : "nowrap",
            textAlign: "center",
        },
        section: {
            marginBottom: useDesktopLayout ? "48px" : isMobile ? "32px" : "48px",
        },
        sectionTitle: {
            margin: "0 0 18px",
            fontSize: useDesktopLayout ? "1.875rem" : isMobile ? "1.375rem" : "1.625rem",
            fontWeight: 700,
            color: "#022156",
        },
        metricsBox: {
            border: "2px solid #022156",
            borderRadius: "8px",
            padding: useDesktopLayout ? "20px" : isMobile ? "14px" : "20px",
        },
        metricsGrid: {
            display: "grid",
            gridTemplateColumns: useDesktopLayout
                ? "repeat(4, minmax(0, 1fr))"
                : isMobile
                    ? "1fr"
                    : "repeat(2, minmax(0, 1fr))",
            gap: "16px",
        },
        metricCard: {
            minHeight: useDesktopLayout ? "96px" : isMobile ? "80px" : "96px",
            border: "2px solid #022156",
            borderRadius: "6px",
            padding: useDesktopLayout ? "16px" : isMobile ? "12px" : "16px",
            backgroundColor: "#f8faff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "4px",
        },
        metricLabel: {
            margin: 0,
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "uppercase",
            color: "#022156",
        },
        metricValue: {
            margin: 0,
            fontSize: useDesktopLayout ? "1.75rem" : isMobile ? "1.5rem" : "1.75rem",
            fontWeight: 700,
            lineHeight: 1,
        },
        empty: {
            border: "2px dashed #b8c0d6",
            borderRadius: "6px",
            padding: "16px",
            textAlign: "center",
            color: "#4b5563",
        },
        usersList: {
            display: "flex",
            flexDirection: "column",
            gap: useDesktopLayout ? "40px" : isMobile ? "28px" : "40px",
        },
        userSection: {
            pageBreakInside: "avoid",
        },
        userBanner: {
            backgroundColor: "#022156",
            padding: useDesktopLayout ? "14px" : isMobile ? "12px" : "14px",
            borderRadius: "6px",
            marginBottom: "16px",
        },
        userBannerTitle: {
            margin: 0,
            textAlign: "center",
            color: "#ffffff",
            fontSize: useDesktopLayout ? "1.75rem" : isMobile ? "1.25rem" : "1.5rem",
            fontWeight: 700,
        },
        userCard: {
            border: "2px solid #022156",
            borderRadius: "10px",
            overflow: "hidden",
        },
        personalInfo: {
            borderBottom: "2px solid #022156",
            padding: useDesktopLayout ? "32px" : isMobile ? "20px" : "24px",
        },
        blockTitle: {
            margin: "0 0 20px",
            fontSize: useDesktopLayout ? "1.5rem" : isMobile ? "1.125rem" : "1.25rem",
            fontWeight: 700,
            color: "#022156",
        },
        infoGrid: {
            display: "grid",
            gridTemplateColumns: useDesktopLayout ? "repeat(2, minmax(0, 1fr))" : isMobile ? "1fr" : "repeat(2, minmax(0, 1fr))",
            gap: useDesktopLayout ? "32px" : isMobile ? "16px" : "32px",
        },
        infoText: {
            margin: "0 0 8px",
            lineHeight: useDesktopLayout ? 2 : isMobile ? 1.7 : 2,
        },
        breakAll: {
            margin: "0 0 8px",
            lineHeight: useDesktopLayout ? 2 : isMobile ? 1.7 : 2,
            wordBreak: "break-all",
        },
        columns: {
            display: "flex",
            flexDirection: useDesktopLayout ? "row" : isCompact ? "column" : "row",
        },
        column: {
            width: useDesktopLayout ? "50%" : isCompact ? "100%" : "50%",
            padding: useDesktopLayout ? "32px" : isMobile ? "20px" : "24px",
            boxSizing: "border-box",
        },
        columnLeft: {
            width: useDesktopLayout ? "50%" : isCompact ? "100%" : "50%",
            padding: useDesktopLayout ? "32px" : isMobile ? "20px" : "24px",
            borderRight: useDesktopLayout ? "2px solid #022156" : isCompact ? "none" : "2px solid #022156",
            borderBottom: useDesktopLayout ? "none" : isCompact ? "2px solid #022156" : "none",
            boxSizing: "border-box",
        },
        entry: {
            pageBreakInside: "avoid",
            marginBottom: "24px",
        },
        entryDate: {
            margin: "0 0 16px",
            paddingBottom: "10px",
            borderBottom: "1px solid #C9C6D9",
            fontSize: useDesktopLayout ? "16px" : isMobile ? "15px" : "16px",
            fontWeight: 700,
            color: "#135BEC",
        },
        entryGrid: {
            display: "grid",
            gridTemplateColumns: useDesktopLayout ? "1fr 1fr" : isMobile ? "1fr" : "1fr 1fr",
            gap: useDesktopLayout ? "16px" : isMobile ? "12px" : "16px",
        },
        dataBox: {
            backgroundColor: "#F0F3FF",
            borderRadius: "8px",
            padding: useDesktopLayout ? "14px 16px" : isMobile ? "12px 14px" : "14px 16px",
            marginBottom: "12px",
        },
        fieldLabel: {
            margin: "0 0 8px",
            fontSize: "12px",
            fontWeight: 700,
            color: "#135BEC",
            letterSpacing: "0.4px",
            textTransform: "uppercase",
        },
        fieldValue: {
            margin: 0,
            fontSize: useDesktopLayout ? "14px" : isMobile ? "13px" : "14px",
            lineHeight: 1.7,
            color: "#000000",
            wordBreak: "break-word",
        },
        taskList: {
            margin: "8px 0 0",
            paddingLeft: "20px",
            lineHeight: 1.7,
            fontSize: useDesktopLayout ? "14px" : isMobile ? "13px" : "14px",
        },
        muted: {
            margin: "8px 0 0",
            fontSize: "13px",
            color: "#4b5563",
            fontStyle: "italic",
        },
        brainstormField: {
            marginBottom: "14px",
        },
        divider: {
            margin: useDesktopLayout ? "28px 0" : isMobile ? "20px 0" : "28px 0",
            border: "none",
            borderTop: "2px dashed #bfbfbf",
        },
    };
}

type AllUsersReportProps = {
    forceDesktopLayout?: boolean;
};

const AllUsersReport = forwardRef<HTMLDivElement, AllUsersReportProps>(function AllUsersReport(
    {forceDesktopLayout = false},
    ref
) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isCompact = useMediaQuery(theme.breakpoints.down("lg"));
    const styles = getReportStyles(isMobile, isCompact, forceDesktopLayout);

    const {reportData, loading} = useAllUsersReport();

    const generatedOn = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    const reportUsers = buildReportFromServerData(reportData);
    const metrics = buildReportMetricsFromServerData(reportData);
    const hasData = reportData.length > 0;

    const {usersDailyLogData} = useDailyLog();
    const mostUserFeelings = overallDominantFeeling(usersDailyLogData);
    console.log("moste user feelijng")
    console.log(mostUserFeelings)

    return (
        <div ref={ref} style={styles.root}>
            <div style={styles.header}>
                <h1 style={styles.title}>HACKATHON USERS REPORT</h1>

                <div style={styles.generatedRow}>
                    <hr style={styles.line}/>
                    <h2 style={styles.generatedText}>Generated On: {generatedOn}</h2>
                    <hr style={styles.line}/>
                </div>
            </div>

            <section style={styles.section}>
                <h2 style={styles.sectionTitle}>REPORT METRICS</h2>

                <div style={styles.metricsBox}>
                    <div style={styles.metricsGrid}>
                        <div style={styles.metricCard}>
                            <p style={styles.metricLabel}>Participants</p>
                            <p style={styles.metricValue}>{metrics.participants}</p>
                        </div>
                        <div style={styles.metricCard}>
                            <p style={styles.metricLabel}>Total Users Daily Logs</p>
                            <p style={styles.metricValue}>{metrics.dailyLogs}</p>
                        </div>
                        <div style={styles.metricCard}>
                            <p style={styles.metricLabel}>Total Users Brainstorms</p>
                            <p style={styles.metricValue}>{metrics.brainstormingSessions}</p>
                        </div>
                        <div style={styles.metricCard}>
                            <p style={styles.metricLabel}>Users Feeling</p>
                            <p style={styles.metricValue}>{`${mostUserFeelings.dominantFeeling} ${mostUserFeelings.emoji}`}</p>
                        </div>
                    </div>
                </div>
            </section>

            {loading && !hasData ? (
                <div style={styles.empty}>Loading report data...</div>
            ) : reportUsers.length === 0 ? (
                <div style={styles.empty}>No users are available for this report.</div>
            ) : (
                <div style={styles.usersList}>
                    {reportUsers.map(({user, dailyLogs, brainstormingSessions}, userIndex) => {
                        const userKey = normalizeUserId(user.user_id) || `${user.name ?? "user"}-${userIndex}`;

                        return (
                            <section key={userKey} style={styles.userSection}>
                                <div style={styles.userBanner}>
                                    <h2 style={styles.userBannerTitle}>USER #{userIndex + 1}</h2>
                                </div>

                                <div style={styles.userCard}>
                                    <div style={styles.personalInfo}>
                                        <h3 style={styles.blockTitle}>PERSONAL INFORMATION</h3>

                                        <div style={styles.infoGrid}>
                                            <div>
                                                <p style={styles.infoText}><strong>Name:</strong> {displayValue(user.name)}</p>
                                                <p style={styles.infoText}><strong>Username:</strong> {displayValue(user.username)}</p>
                                                <p style={styles.breakAll}><strong>Email:</strong> {displayValue(user.email)}</p>
                                            </div>

                                            <div>
                                                <p style={styles.infoText}><strong>Age:</strong> {displayValue(user.age)}</p>
                                                <p style={styles.infoText}><strong>Gender:</strong> {displayValue(user.gender)}</p>
                                                <p style={styles.breakAll}><strong>GitHub:</strong> {displayValue(user.github_link)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={styles.columns}>
                                        <div style={styles.columnLeft}>
                                            <h3 style={styles.blockTitle}>DAILY LOGS</h3>

                                            {dailyLogs.length === 0 ? (
                                                <div style={styles.empty}>No daily logs recorded.</div>
                                            ) : (
                                                dailyLogs.map((log, logIndex) => {
                                                    const tasks = toTextList(log.user_tasks);
                                                    const logKey = log._id || `${userKey}-log-${log.log_date ?? logIndex}`;

                                                    return (
                                                        <article key={logKey} style={styles.entry}>
                                                            <h4 style={styles.entryDate}>{formatReportDate(log.log_date)}</h4>

                                                            <div style={styles.entryGrid}>
                                                                <div>
                                                                    <div style={styles.dataBox}>
                                                                        <p style={styles.fieldLabel}>Mood</p>
                                                                        <p style={styles.fieldValue}>{displayValue(log.user_feeling)}</p>
                                                                    </div>

                                                                    <div style={{...styles.dataBox, marginBottom: 0}}>
                                                                        <p style={styles.fieldLabel}>Tasks</p>
                                                                        {tasks.length > 0 ? (
                                                                            <ul style={styles.taskList}>
                                                                                {tasks.map((task, taskIndex) => (
                                                                                    <li key={`${logKey}-task-${taskIndex}`}>{task}</li>
                                                                                ))}
                                                                            </ul>
                                                                        ) : (
                                                                            <p style={styles.muted}>No tasks recorded.</p>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                <div style={{...styles.dataBox, marginBottom: 0}}>
                                                                    <p style={styles.fieldLabel}>Reflection</p>
                                                                    <p style={styles.fieldValue}>{displayValue(log.user_text_feeling)}</p>
                                                                </div>
                                                            </div>

                                                            {logIndex < dailyLogs.length - 1 && <hr style={styles.divider}/>}
                                                        </article>
                                                    );
                                                })
                                            )}
                                        </div>

                                        <div style={styles.column}>
                                            <h3 style={styles.blockTitle}>BRAINSTORMING SESSIONS</h3>

                                            {brainstormingSessions.length === 0 ? (
                                                <div style={styles.empty}>No brainstorming sessions recorded.</div>
                                            ) : (
                                                brainstormingSessions.map((session, sessionIndex) => {
                                                    const sessionKey = session._id || `${userKey}-brainstorm-${session.log_date ?? sessionIndex}`;

                                                    return (
                                                        <article key={sessionKey} style={styles.entry}>
                                                            <h4 style={styles.entryDate}>{formatReportDate(session.log_date)}</h4>

                                                            <div style={styles.dataBox}>
                                                                <div style={styles.brainstormField}>
                                                                    <p style={styles.fieldLabel}>Interests</p>
                                                                    <p style={styles.fieldValue}>{displayValue(session.user_interests)}</p>
                                                                </div>
                                                                <div style={styles.brainstormField}>
                                                                    <p style={styles.fieldLabel}>Tech Stack</p>
                                                                    <p style={styles.fieldValue}>{displayValue(session.user_techstack)}</p>
                                                                </div>
                                                                <div style={styles.brainstormField}>
                                                                    <p style={styles.fieldLabel}>Tech Interests</p>
                                                                    <p style={styles.fieldValue}>{displayValue(session.user_techstack_interests)}</p>
                                                                </div>
                                                                <div style={styles.brainstormField}>
                                                                    <p style={styles.fieldLabel}>Possible Impact</p>
                                                                    <p style={styles.fieldValue}>{displayValue(session.user_possible_project_impact)}</p>
                                                                </div>
                                                                <div style={styles.brainstormField}>
                                                                    <p style={styles.fieldLabel}>Tools Used</p>
                                                                    <p style={styles.fieldValue}>{displayValue(session.user_tools_utilized)}</p>
                                                                </div>
                                                                <div style={{...styles.brainstormField, marginBottom: 0}}>
                                                                    <p style={styles.fieldLabel}>Reason</p>
                                                                    <p style={styles.fieldValue}>{displayValue(session.user_reason_for_interests)}</p>
                                                                </div>
                                                            </div>

                                                            {sessionIndex < brainstormingSessions.length - 1 && <hr style={styles.divider}/>}
                                                        </article>
                                                    );
                                                })
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </div>
            )}
        </div>
    );
});

export default AllUsersReport;
