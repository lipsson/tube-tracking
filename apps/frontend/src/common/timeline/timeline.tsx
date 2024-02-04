import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
import { FC } from 'react';
import { CardHeader, Divider } from '@mui/material';


export const TimelineSample: FC<{ title: string, dataArray: string[] }> = ({ title, dataArray }) => {
    return (
        <>
            <CardHeader title={title} />
            <Divider />
            <Timeline position="alternate">
                {dataArray.map((item, index) => (
                    <TimelineItem key={item}>
                        <TimelineSeparator>
                            <TimelineDot variant="outlined" sx={{
                                borderColor: index < dataArray.length - 1 ? 'grey' : 'primary.main'
                            }} />
                            {index < dataArray.length - 1 && <TimelineConnector />}
                        </TimelineSeparator>
                        <TimelineContent>{item}</TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </>
    );
}
