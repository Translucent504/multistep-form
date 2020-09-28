import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik, Form } from 'formik'
import * as yup from 'yup'

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Signup = () => {
    const classes = useStyles()
    const SignupSchema = yup.object().shape(
        {
            firstName: yup.string().required('First Name Required'),
            lastName: yup.string().required('Last Name Required'),
            email: yup.string().email().required('Email is required'),
            password: yup.string()
                .min(6, 'Peepee too short')
                .max(20, 'PeePee too big')
                .required('Password is required')
        }
    )
    return (
        <Container component='main' maxWidth='xs'>
            <CssBaseline />
            <section className={classes.paper}>
                <Typography variant='h5' component='h1'>
                    Sign up!
                </Typography>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => console.log(values)}>


                    {({ errors, handleChange, touched }) => (
                        <Form className={classes.form}>
                            <Grid container spacing={2}>
                                <Grid item xs="12" sm="6">
                                    <TextField
                                        error={errors.firstName && touched.firstName}
                                        onChange={handleChange}
                                        helperText={errors.firstName && touched.firstName ? errors.firstName : null}
                                        autoComplete='fname'
                                        name='firstName'
                                        fullWidth
                                        variant='outlined'
                                        id='firstName'
                                        label='First Name'
                                        autoFocus />
                                </Grid>
                                <Grid item xs="12" sm="6">
                                    <TextField
                                        error={errors.lastName && touched.lastName}
                                        onChange={handleChange}
                                        helperText={errors.lastName && touched.lastName ? errors.lastName : null}
                                        variant='outlined'
                                        fullWidth
                                        id='lastName'
                                        label='Last Name'
                                        autoComplete='lname' />
                                </Grid>
                                <Grid item xs="12" >
                                    <TextField
                                        error={errors.email && touched.email}
                                        onChange={handleChange}
                                        helperText={errors.email && touched.email ? errors.email : null}
                                        variant='outlined'
                                        fullWidth
                                        id='email'
                                        label='Email Address'
                                        name='email'
                                        autoComplete='email' />
                                </Grid>
                                <Grid item xs="12" >
                                    <TextField
                                        error={errors.password && touched.password}
                                        onChange={handleChange}
                                        helperText={errors.password && touched.password ? errors.password : null}
                                        variant='outlined'
                                        fullWidth
                                        id='password'
                                        name='password'
                                        autoComplete='current password'
                                        type='password'
                                        label='Password' />
                                </Grid>
                                <Button
                                    className={classes.submit}
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    color='primary'
                                >
                                    Sign Up
                        </Button>
                            </Grid>
                        </Form>)
                    }
                </Formik>
            </section>
        </Container>
    )
}

export default Signup
