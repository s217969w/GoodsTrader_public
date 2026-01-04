interface menuItems{
    iconPath: string
    series: string
}

interface SelectorProps{
    items: menuItems[]
}

function SeriesSelector({items}: SelectorProps) {
    return (
        <div
            style={{
                backgroundColor: "lightblue",
                width: "4vw",
                height: "100vh",
                display: "flex",
                flexDirection: "row"
            }}
        >
            {items.map(item =>(
                <img 
                    alt={item.series}
                    src={item.iconPath}
                    style={{width: "3vw", height: "3vw"}}
                />
            ))}
        </div>
    )
}

export default SeriesSelector