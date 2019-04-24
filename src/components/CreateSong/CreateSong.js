import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { ContainerModal } from "../containers/StyledContainers";
import FormAddSong from "./Form/FormAddSong";
import ModalPreviewSong from "./Preview/ModalPreviewSong";
import { db } from "../../App";
import { withStyles } from "@material-ui/core/styles";
import { MdAdd } from "react-icons/md";
import Fab from "@material-ui/core/Fab";
import withWidth from "@material-ui/core/withWidth";
import toRenderProps from "recompose/toRenderProps";

const styles = theme => ({
	wrapper: {
		zIndex: 5000
	},
	modalWrapper: {
		transform: "translateZ(0)",
		backfaceVisibility: "hidden",
		perspective: "1000",
		position: "absolute",
		top: 0,
		height: "100%",
		width: "700px",
		background: "white",
		outline: "none",
		[theme.breakpoints.down("sm")]: {
			width: "100%",
			maxWidth: "100%",
			left: 0
		}
	},
	Btn: {
		color: "white",
		fontSize: "14px",
		fontWeight: "bold",
		textTransform: "none",
		padding: "3px 25px",
		borderColor: "white",
		marginLeft: 15,
		"&:hover": {
			backgroundColor: "#02a8f4"
		},
		[theme.breakpoints.down("sm")]: {
			"&:hover": {
				backgroundColor: theme.palette.primary.main
			}
		}
	},
	xs: {
		fontSize: 35,
		width: 50,
		height: 50,
		padding: 0,
		borderRadius: 50,
		zIndex: 4000,
		backgroundColor: theme.palette.primary.main,
		color: "white",
		boxShadow: "#464646 1px 2px 4px 0",
		"&:hover": {
			backgroundColor: theme.palette.primary.main
		}
	}
});

const WithWidth = toRenderProps(withWidth());

class CreateSongModal extends Component {
	state = {
		open: false,
		isError: false,
		error: {
			title: false,
			description: false,
			category: false
		},
		isPreviewed: false,
		song: {
			title: "",
			performer: "",
			description: "",
			category: ""
		}
	};

	handleOpen = () => {
		this.setState({ open: true });
		const body = document.querySelector("body");
		body.classList.add("not-scrollable");
	};

	handleClose = () => {
		this.setState({
			open: false,
			isError: false,
			error: {
				title: false,
				description: false,
				category: false
			}
		});
		const body = document.querySelector("body");
		body.classList.remove("not-scrollable");
	};

	handleChange = event => {
		const { name } = event.currentTarget;
		const { error, song } = this.state;
		this.setState({
			song: {
				...song,
				[name]: event.target.value
			},
			error: {
				...error,
				[name]: error[name] === true ? false : false
			}
		});
	};

	handleChangeSongText = event => {
		const { name } = event.currentTarget;
		const { error, song } = this.state;

		let inputValue = event.target.value;
		inputValue = inputValue.startsWith("\n")
			? inputValue.substr(1)
			: inputValue;

		inputValue = inputValue.endsWith("\n\n\n")
			? inputValue.substr(0, inputValue.length - 1)
			: inputValue;

		this.setState({
			song: {
				...song,
				[name]: inputValue
			},
			error: {
				...error,
				[name]: error[name] === true ? false : false
			}
		});
	};

	handleFormSubmit = e => {
		e.preventDefault();
		const { song } = this.state;
		const required = Object.keys(song).filter(key => key !== "performer");
		const emptyValues = required.filter(key => song[key] === "");
		const error = emptyValues.reduce(
			(acc, next) => ({
				...acc,
				[next]: true
			}),
			{}
		);
		const isError = emptyValues.length > 0;
		if (isError) {
			this.setState({
				...this.state,
				isError: true,
				error
			});
		} else {
			db.ref("songs-to-approve")
				.push()
				.set({ ...song, isApproved: false })
				.then(() => {
					alert("Added song successfully");
					this.setState({
						open: false,
						isError: false,
						error: {},
						isPreviewed: false,
						song: {
							title: "",
							performer: "",
							description: "",
							category: ""
						}
					});
				})
				.catch(error => alert(error.message));
		}
	};

	handleSongPreview = () => {
		const { isPreviewed } = this.state;
		this.setState({
			...this.state,
			isPreviewed: !isPreviewed
		});
	};

	render() {
		const { song, open, isPreviewed, isError, error } = this.state;
		const { classes } = this.props;
		return (
			<WithWidth>
				{({ width }) => (
					<Fragment>
						{width === "xs" || width === "sm" ? (
							<Fab className={classes.xs} onClick={this.handleOpen}>
								<MdAdd />
							</Fab>
						) : (
							<Button
								className={classes.Btn}
								variant="outlined"
								onClick={this.handleOpen}
							>
								Dodaj utwór
							</Button>
						)}

						<Modal open={open} className={classes.wrapper}>
							<ContainerModal>
								<div className={classes.modalWrapper}>
									<FormAddSong
										song={song}
										handleSubmit={this.handleFormSubmit}
										handleChange={this.handleChange}
										handleChangeSongText={this.handleChangeSongText}
										handleCloseModal={this.handleClose}
										handleSongPreview={this.handleSongPreview}
										error={error}
										isError={isError}
										screenSize={width}
									/>
								</div>
							</ContainerModal>
						</Modal>
						<ModalPreviewSong
							isPreviewed={isPreviewed}
							handleSongPreview={this.handleSongPreview}
							song={song}
						/>
					</Fragment>
				)}
			</WithWidth>
		);
	}
}

export default withStyles(styles)(CreateSongModal);
