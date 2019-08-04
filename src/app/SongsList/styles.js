export default theme => ({
    wrapper: {
        [theme.breakpoints.down("sm")]: {
            paddingBottom: 100,
            paddingTop: 15
        }
    },
    btn: {
        textTransform: "none",
        marginLeft: 8
    },
    xs: {
        fontSize: 35,
        position: "fixed",
        width: 50,
        height: 50,
        padding: 0,
        borderRadius: 50,
        bottom: 20,
        right: 270,
        zIndex: 4000,
        backgroundColor: theme.palette.primary.main,
        color: "white",
        boxShadow: "#464646 1px 2px 4px 0",
        "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: "white"
        }
    },
    contentGrid: {
        width: "100%"
    },
    drawer: {
        zIndex: 9600
    },
    categories: {
        position: "sticky",
        top: 95
    },
    categoryTitle: {
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 8,
        marginLeft: 8
    },
    spinnerWrapper: {
        display: "flex",
        justifyContent: "center"
    }
});