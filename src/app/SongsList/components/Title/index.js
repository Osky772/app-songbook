import React from 'react';
import { Typography } from "@material-ui/core";
import styles from './styles';

const Title = ({ category }) => {
    const titleFirstLetterUppercased =
        category.slice(0, 1).toUpperCase() + category.slice(1);
    
    return (
        <Typography style={styles.categoryTitle}>
            {category === ""
                ? "Wszystkie piosenki"
                : titleFirstLetterUppercased}
        </Typography>
    )
}

export default Title;