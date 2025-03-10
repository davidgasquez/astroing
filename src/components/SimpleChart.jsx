import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for the chart
const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 900 },
    { name: 'Jul', value: 700 },
];

export default function SimpleChart() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Check initial theme
        setIsDarkMode(document.documentElement.classList.contains('dark'));

        // Set up observer for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    setIsDarkMode(document.documentElement.classList.contains('dark'));
                }
            });
        });

        observer.observe(document.documentElement, { attributes: true });

        return () => observer.disconnect();
    }, []);

    // Theme-based colors
    const colors = {
        stroke: isDarkMode ? '#aaa' : '#555',
        grid: isDarkMode ? 'rgba(68, 68, 68, 0.3)' : 'rgba(221, 221, 221, 0.5)',
        line: isDarkMode ? '#ccc' : '#333',
        activeDot: isDarkMode ? '#fff' : '#000',
        text: isDarkMode ? '#eee' : '#333',
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                style={{ backgroundColor: 'transparent' }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                <XAxis
                    dataKey="name"
                    stroke={colors.stroke}
                    tick={{ fill: colors.text }}
                    axisLine={{ stroke: colors.stroke, strokeWidth: 1 }}
                />
                <YAxis
                    stroke={colors.stroke}
                    tick={{ fill: colors.text }}
                    axisLine={{ stroke: colors.stroke, strokeWidth: 1 }}
                />
                <Tooltip
                    contentStyle={{
                        backgroundColor: isDarkMode ? '#2a2a2a' : '#f9f9f9',
                        borderColor: colors.stroke,
                        color: colors.text,
                        borderRadius: '4px',
                        boxShadow: isDarkMode ? '0 2px 4px rgba(0, 0, 0, 0.3)' : '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                />
                <Legend
                    wrapperStyle={{ color: colors.text }}
                />
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke={colors.line}
                    strokeWidth={2}
                    dot={{ stroke: colors.line, strokeWidth: 2, fill: 'transparent' }}
                    activeDot={{ r: 8, stroke: colors.line, strokeWidth: 2, fill: colors.activeDot }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
