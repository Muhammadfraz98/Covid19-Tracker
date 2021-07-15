import React from 'react'
import './infoBox.css'
import { Card, CardContent, Typography } from "@material-ui/core"

const InfoBox = ({ title, cases, total, active, isRed, isBlue, ...props }) => {
    return (
        <Card onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${isRed && "infoBox--red"} ${isBlue && "infoBox--blue"}`}>
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
        </Card>

    )
}

export default InfoBox;
