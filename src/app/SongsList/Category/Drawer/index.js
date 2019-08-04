import React from "react";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export default ({ isDrawerOpen, toggleDrawer, categories, handleCategorySelect }) => {
    return (
        <Drawer
            open={isDrawerOpen}
            onClose={() => toggleDrawer(false)}
            // className={classes.drawer}
            style={{ zIndex: 9600 }}
        >
            <div>
                <ListItem
                    button
                    onClick={() => handleCategorySelect("")}
                >
                    <ListItemText primary={"Wszystkie"} />
                </ListItem>
            </div>
            {categories}
        </Drawer>
    )
}