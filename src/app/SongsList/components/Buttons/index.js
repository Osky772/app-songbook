import React, { Fragment } from 'react';
import Button from "@material-ui/core/Button";
import styles from './styles';
import PropTypes from 'prop-types';

const Buttons = ({ handleSelectAll, handleClearSelectAll, songsList }) => {
    return (
        <Fragment>
            <Button
                onClick={() => handleSelectAll(songsList)}
                variant="outlined"
                style={styles.btn}
            >
                Zaznacz wszystkie
            </Button>
            <Button
                onClick={handleClearSelectAll}
                variant="outlined"
                style={styles.btn}
            >
                Wyczyść
            </Button>
        </Fragment>
    )
}

Buttons.propTypes = {
    handleSelectAll: PropTypes.func.isRequired,
    handleClearSelectAll: PropTypes.func.isRequired,
    songsList: PropTypes.array.isRequired
}

export default Buttons;