import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import Typography, { typographyClasses } from '@mui/joy/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import AppRegistrationRoundedIcon from '@mui/icons-material/AppRegistrationRounded';

export default function StepperContainer() {

    const items = [
        {
            day: "Day 1",
            checkIn: "2024-01-01",
            textContent: "Completed account setup, updated personal information, explored dashboard features, and reviewed introductory platform documentation."
        },
        {
            day: "Day 2",
            checkIn: "2024-01-02",
            textContent: "Attended onboarding session, configured notification preferences, connected services, and tested initial application functionality."
        },
        {
            day: "Day 3",
            checkIn: "2024-01-03",
            textContent: "Worked through learning modules, completed exercises, submitted progress updates, and documented key observations."
        },
        {
            day: "Day 4",
            checkIn: "2024-01-04",
            textContent: "Participated in team discussions, shared project ideas, collected feedback, and refined implementation plans."
        },
        {
            day: "Day 5",
            checkIn: "2024-01-05",
            textContent: "Performed system testing, identified issues, recorded findings, implemented fixes, and verified expected behavior."
        },
        {
            day: "Day 6",
            checkIn: "2024-01-06",
            textContent: "Analyzed performance metrics, optimized configurations, improved responsiveness, and documented technical improvement outcomes."
        },
        {
            day: "Day 7",
            checkIn: "2024-01-07",
            textContent: "Finalized weekly tasks, reviewed accomplishments, organized future goals, and prepared summary presentation materials."
        }
    ];

    return (
        <Stepper
            orientation="vertical"
            sx={(theme) => ({
                '--Stepper-verticalGap': '2.5rem',
                '--StepIndicator-size': '2.5rem',
                '--Step-gap': '1rem',
                '--Step-connectorInset': '0.5rem',
                '--Step-connectorRadius': '1rem',
                '--Step-connectorThickness': '4px',
                '--joy-palette-success-solidBg': 'var(--joy-palette-success-400)',
                [`& .${stepClasses.completed}`]: {
                    '&::after': { bgcolor: 'success.solidBg' },
                },
                [`& .${stepClasses.active}`]: {
                    [`& .${stepIndicatorClasses.root}`]: {
                        border: '4px solid',
                        borderColor: '#fff',
                        boxShadow: `0 0 0 1px ${theme.vars.palette.primary[500]}`,
                    },
                },
                [`& .${stepClasses.disabled} *`]: {
                    color: 'neutral.softDisabledColor',
                },
                [`& .${typographyClasses['title-sm']}`]: {
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontSize: '10px',
                },
            })}
        >

            {items.map((item, index) => (
                <Step
                    completed
                    indicator={
                        // <StepIndicator variant="solid" color="success">
                        //     <CheckRoundedIcon />
                        // </StepIndicator>
                        <div className="bg-[#135BEC] rounded-full size-full flex items-center justify-center">
                            <h2 className="text-xs text-[#FFFFFF] font-bold">{item.day}</h2>
                        </div>
                    }
                >
                    <div className="bg-[#FFFFFF] flex flex-col gap-2 p-4 justify-center rounded-lg border-2 border-[#C9C6D9]">
                        <Typography level="title-sm text-[#135BEC]">{item.checkIn}</Typography>

                        <div className="bg-[#F0F3FF] rounded-lg p-4 flex flex-col gap-2">
                            <h2 className="font-semibold text-lg text-[#135BEC]">Brainstorming Ideas</h2>
                            <p className="italic text-sm font-light">{item.textContent}</p>
                        </div>

                        <div className="bg-[#F0F3FF] rounded-lg p-4 flex flex-col gap-2">
                            <h2 className="font-semibold text-lg text-[#135BEC]">User Task</h2>
                            <p className="italic text-sm font-light">{item.textContent}</p>
                        </div>

                        <div className="bg-[#F0F3FF] rounded-lg p-4 flex flex-col gap-2">
                            <h2 className="font-semibold text-lg text-[#135BEC]">User Feeling in Text</h2>
                            <p className="italic text-sm font-light">{item.textContent}</p>
                        </div>

                        {/*<div className="flex flex-row gap-4">*/}
                        {/*    <span className="bg-[#F0F3FF] px-4 py-1 rounded-2xl text-sm font-semibold">Fix the backend</span>*/}
                        {/*    <span className="bg-[#F0F3FF] px-4 py-1 rounded-2xl text-sm font-semibold">Fix the backend</span>*/}
                        {/*    <span className="bg-[#F0F3FF] px-4 py-1 rounded-2xl text-sm font-semibold">Fix the backend</span>*/}
                        {/*</div>*/}
                    </div>
                </Step>
            ))}
        </Stepper>
    );
}
