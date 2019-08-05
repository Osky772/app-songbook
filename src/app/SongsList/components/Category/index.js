import React from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid";
import CategoryDrawer from './Drawer';
import CategorySelector from './Selector';

const Category = ({ width, isDrawerOpen, toggleDrawer, handleCategorySelect, categories }) => {
    return (
        <Grid item md={4}>
            {width === "xs" || width === "sm" ? (
                <CategoryDrawer
                    isDrawerOpen={isDrawerOpen}
                    toggleDrawer={toggleDrawer}
                    handleCategorySelect={handleCategorySelect}
                    categories={categories}
                />
            ) : (
                    <CategorySelector
                        categories={categories}
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
    categories: PropTypes.array.isRequired,
}

export default Category;