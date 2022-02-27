import React from "react";
import { Box, Card as MuiCard, CardActions, CardContent, Link, Typography } from "@material-ui/core";
import { ArrowRightAlt } from '@material-ui/icons';
import useStyles from "./styles";

/**
 * 
 * @param {*} props
 *  backgroundColor
 *  actionsColor 
 *  title
 *  linkContent
 *  children element    
 * @returns Card element
 */

const Card = (props) => {
    const classes = useStyles({backgroundColor: props.backgroundColor, actionsColor: props.actionsColor});

    return (
        <MuiCard
            className={classes.muiCard}
        >
            <Box
                className={classes.boxCard}
            >
                <CardContent className={classes.cardContent}>
                    <Typography variant="body1">{props.title}</Typography>
                    {props.children}
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Link href={props.href} className={classes.link}>{props.linkContent} <ArrowRightAlt /></Link>
                </CardActions>
            </Box>
        </MuiCard>
    );
};

export default Card;
