import Stepper from '@mui/joy/Stepper';
import { stepClasses } from '@mui/joy/Step';
import { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import Typography, { typographyClasses } from '@mui/joy/Typography';

type StepperProps = { usersData: any };

export default function IdeaStepperContainer({usersData}: StepperProps) {

    // const brainstormingData = usersData?.brainstorming_ideas;
    const brainstormingData = [...(usersData?.brainstorming_ideas || [])].sort(
        (a, b) =>
            new Date(b.log_date).getTime() -
            new Date(a.log_date).getTime()
    )

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
            {brainstormingData?.map((item, index) => (
                <div key={index} className="bg-[#FFFFFF] flex flex-col gap-2 p-4 justify-center rounded-lg border-2 border-[#C9C6D9]">
                    <Typography level="title-sm text-[#135BEC]">{item.log_date}</Typography>

                    <div className="bg-[#F0F3FF] rounded-lg p-4 flex flex-col gap-2">
                        <h2 className="font-semibold text-lg text-[#135BEC]">Brainstorming Ideas</h2>
                        <ul className="list-disc pl-5">
                            {item.user_interests?.map((idea, index) => (
                                <li key={index} className="italic text-sm font-light">
                                    {idea}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </Stepper>
    );
}
