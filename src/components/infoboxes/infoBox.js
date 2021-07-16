import React, { useState } from 'react'
import './infoBox.css'
import { Card, CardActionArea, CardContent, Typography } from "@material-ui/core"

const InfoBox = ({ title, cases, total, active, isRed, isBlue, ...props }) => {

    const [shadow, setShadow] = useState(1)
    const onMouseOver = () => setShadow({ shadow: 3 });
    const onMouseOut = () => setShadow({ shadow: 1 });

    return (
        <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"} ${isBlue && "infoBox--blue"}`}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
        >
            <CardActionArea>
                <CardContent>
                    <Typography className="infoBox__title" color="textSecondary">
                        {/* Title */}
                        {title}
                    </Typography>

                    {/* number of cases */}
                    <h2 className={`infoBox__cases ${!isRed && !isBlue && "infoBox__cases--green"}`}>  {cases} </h2>

                    <Typography className="infoBox__total" color="textSecondary">
                        {/* total */}
                        {total} Total
                    </Typography>
                </CardContent>
            </CardActionArea>

        </Card>

    )
}

export default InfoBox;
