import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import * as firebase from "firebase";

const styles = theme => ({
	main: {
		width: "auto",
		display: "block", // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: "auto",
			marginRight: "auto"
		}
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
			.spacing.unit * 3}px`
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing.unit
	},
	submit: {
		marginTop: theme.spacing.unit * 3
	}
});

class Sign extends Component {
	state = {
		email: "",
		password: "",
		open: false
	};

	static getDerivedStateFromProps(props, state) {
		if (state.open !== props.isOpen) {
			return {
				open: props.isOpen
			};
		}
		return null;
	}

	handleChange = event => {
		this.setState({
			[event.currentTarget.name]: event.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const { email, password } = this.state;
		if (this.props.isSignedUp) {
			firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then(value => {
					firebase
						.database()
						.ref(`users/${value.user.uid}`)
						.set({
							email,
							password,
							uid: value.user.uid
						});
					alert("rejestracja sie udala, yay !");
				})
				.catch(error => {
					alert(error.message);
				});
		} else {
			firebase
				.auth()
				.signInWithEmailAndPassword(email, password)
				.then(() => {
					alert("logowanie sie udalo, yay !");
				})
				.catch(error => {
					alert(error.message);
					this.props.handleClose();
				});
		}
	};

	render() {
		const { classes, isSignedUp, isOpen, handleClose } = this.props;
		const title = isSignedUp ? "Zarejestruj się" : "Zaloguj się";
		return (
			<Modal open={isOpen} onClose={() => handleClose()}>
				<main className={classes.main}>
					<CssBaseline />
					<Paper className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							{title}
						</Typography>
						<form className={classes.form} onSubmit={this.handleSubmit}>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="email">Adres email</InputLabel>
								<Input
									id="email"
									name="email"
									autoComplete="email"
									autoFocus
									value={this.state.email}
									onChange={this.handleChange}
								/>
							</FormControl>
							<FormControl margin="normal" required fullWidth>
								<InputLabel htmlFor="password">Hasło</InputLabel>
								<Input
									name="password"
									type="password"
									id="password"
									autoComplete="current-password"
									value={this.state.password}
									onChange={this.handleChange}
								/>
							</FormControl>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
							>
								{title}
							</Button>
						</form>
					</Paper>
				</main>
			</Modal>
		);
	}
}

export default withStyles(styles)(Sign);
