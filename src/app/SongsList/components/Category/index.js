import React from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import CategoryDrawer from './Drawer';
import CategorySelector from './Selector';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const Category = ({ width, isDrawerOpen, toggleDrawer, handleCategorySelect, songs = [] }) => {
    const uniqueCategories = [...new Set(songs.map(song => song.category))];
    const categoriesList = uniqueCategories.map(category => {
        const firstLetterUppercased =
            category.slice(0, 1).toUpperCase() + category.slice(1);
        return (
            <ListItem
                button
                onClick={() => this.handleCategorySelect(category)}
                key={category}
            >
                <ListItemText primary={firstLetterUppercased} />
            </ListItem>
        );
    });
    return (
        <Grid item md={4}>
            {width === "xs" || width === "sm" ? (
                <CategoryDrawer
                    isDrawerOpen={isDrawerOpen}
                    toggleDrawer={toggleDrawer}
                    handleCategorySelect={handleCategorySelect}
                    categories={categoriesList}
                />
            ) : (
                    <CategorySelector
                        categories={categoriesList}
                        handleCategorySelect={handleCategorySelect}
                    />
                )}
        </Grid>
    )
}

Category.propTypes = {
    width: PropTypes.string.isRequired,
    isDrawerOpen: PropTypes.bool.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    handleCategorySelect: PropTypes.func.isRequired,
    songs: PropTypes.array.isRequired,
}

export default Category;