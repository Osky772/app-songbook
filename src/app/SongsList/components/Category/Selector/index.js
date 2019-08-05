import React from "react";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export default ({ categories, handleCategorySelect}) => {
    return (
        <Paper style={{ position: "sticky", top: 95 }}>
            <List component="nav" style={{ background: "white" }}>
                {
                    <ListItem
                        button
                        onClick={() => handleCategorySelect("")}
                    >
                        <ListItemText primary={"Wszystkie"} />
                    </ListItem>
                }
                {categories}
            </List>
        </Paper>
    )
}