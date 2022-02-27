import React from "react";
import { useTheme } from "@material-ui/styles";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Label,
    ResponsiveContainer,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
const Chart = (props) => {
    const theme = useTheme();
    console.log(props.dataChart);
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                width={"100%"}
                height={"100%"}
                data={props.dataChart}
                margin={{ top: 16, right: 16, bottom: 0, left: 24 }}
            >
                <XAxis
                    dataKey="time"
                />
                <YAxis
                >
                    <Label
                        angle={270}
                        position="left"
                        style={{
                            textAnchor: "middle",
                            fill: "blue",
                            ...theme.typography.body1,
                        }}
                    >
                        Total (€)
                    </Label>
                </YAxis>
                <Tooltip />
                <Legend />
                <Line
                    isAnimationActive={true}
                    type="monotone"
                    dataKey="amount"
                    stroke={theme.palette.primary.main}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default Chart;
