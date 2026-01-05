import { useEffect, useState } from "react";

interface menuItems {
    iconPath: string
    series: string
}

interface SelectorProps {
    path: string
}

function SeriesSelector({path}: SelectorProps) {
    const [items, setItems] = useState<menuItems[]>([]);

    useEffect(() => {
        fetch(path)
            .then(res => res.json())
            .then((data) => {
                const items: menuItems[] = data.series.map((item: any) => ({
                iconPath: item.img,
                series: item.name
                }));
                setItems(items);
            });
    }, [path]);
    return (
        <div
            style={{
                backgroundColor: "lightblue",
                width: "50px",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {items.map(item => (
                <img
                    alt={item.series}
                    src={item.iconPath}
                    style={{ 
                        width: "50px", 
                        height: "50px", 
                        padding: "5px"
                    }}
                />
            ))}
        </div>
    )
}

export default SeriesSelector