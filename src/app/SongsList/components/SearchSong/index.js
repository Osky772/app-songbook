import React from 'react';
import PropTypes from 'prop-types';
import SearchInputField from "../../../common/SearchInputField";

const SearchSong = ({ handleChangeForm }) => {
    return (
        <div
            style={{
                width: "100%",
                padding: 8
            }}
        >
            <SearchInputField
                handleChange={handleChangeForm}
                placeholder="Wpisz nazwę artysty lub tytuł piosenki..."
                label="Wyszukaj piosenkę"
            />
        </div>
    )
}

SearchSong.propTypes = {
    handleChangeForm: PropTypes.func.isRequired
}

export default SearchSong;