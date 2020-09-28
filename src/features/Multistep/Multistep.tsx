import React, { useState } from 'react'
import { Box, Button, Card, CardContent, CircularProgress, Step, StepLabel, Stepper } from '@material-ui/core'
import { Formik, Form, Field, FormikConfig, FormikValues } from 'formik'
import { CheckboxWithLabel, TextField } from 'formik-material-ui'
import { mixed, number, object, string, } from 'yup'


const step1Schema = object({
    firstName: string().required('First Name required'),
    lastName: string().required('Last Name required'),
})

const step2Schema = object({
    hoursPlayed: mixed().when('spammer', {
        is: true,
        then: number().required('Hours Played required').min(1000, 'Atleast 1000 Hours played to be called a spammer'),
        otherwise: number().required('Hours Played required')
    })
})

const step3Schema = object({
    comments: string().required('plz commentx')
})
const sleep = (time: any) => new Promise((acc) => setTimeout(acc, time))

const FormikStepper = ({ children, ...props }: FormikConfig<FormikValues>) => {
    // This is a wrapper function for A Formik form. It has the same interface as the Formik Component so
    // that it can just take everything that we would normally pass to a Formik Component and just
    // pass it down to the actual Formik component based on our case.
    // The idea is to consider every 'step' in the form to be a separate Formik component with its
    // own separate validation.
    const [step, setStep] = useState(0)
    const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
    const currentChild = childrenArray[step] as React.ReactElement<FormikStepProps>
    const isLastStep = () => {
        return step === (childrenArray.length - 1)
    }

    return (
        <div>
            <Stepper activeStep={step}>
                {childrenArray.map((child, index) => {
                    return (
                        <Step key={child.props.stepName} >
                            <StepLabel >{child.props.stepName}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <Formik {...props}
                validationSchema={currentChild.props.validationSchema}
                onSubmit={async (values, helpers) => {
                    if (isLastStep()) {
                        await props.onSubmit(values, helpers)
                        helpers.resetForm()
                        setStep(0)
                    } else {
                        setStep(s => s + 1)
                    }
                }}>
                {({ isSubmitting }) => (
                    <Form autoComplete="off">
                        {currentChild}
                        {step > 0 && <Button disabled={isSubmitting} color='primary' variant='contained' onClick={() => setStep(s => s - 1)}>Back</Button>}
                        {<Button disabled={isSubmitting} startIcon={isSubmitting && <CircularProgress size='1rem' />} color='primary' variant='contained' type='submit'>{isSubmitting ? 'Submitting' : isLastStep() ? 'Submit' : 'Next'}</Button>}
                    </Form>
                )}
            </Formik>
        </div>
    )
}

interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
    // Just an interface for each step which makes it only take in 2 props: children and validationSchema
    // which are picked from Formik's own types.
    stepName: string
}

const FormikStep = ({ children }: FormikStepProps) => {
    // This is just a wrapper around our fields to separate each 'step'
    // it allows us to take in a separate validation schema or whatever we want in its props
    // and it renders its children as it is. We can access the schema passed to it through
    // the children props of its parent etc.
    return <>{children}</>
}


const Multistep = () => {

    return (
        <Card >
            <CardContent >
                <FormikStepper
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        spammer: false,
                        hoursPlayed: 0,
                        comments: ''
                    }}
                    onSubmit={async (values) => {
                        await sleep(3000)
                        console.log(values)
                    }}>
                    <FormikStep stepName='Personal Info' validationSchema={step1Schema}>
                        <Box>
                            <Field
                                name="firstName"
                                component={TextField}
                                label="First Name" />
                        </Box>
                        <Box>
                            <Field
                                name="lastName"
                                component={TextField}
                                label="Last Name" />
                        </Box>
                        <Box>
                            <Field
                                name="spammer"
                                component={CheckboxWithLabel}
                                Label={{ label: "Hero Spammer?" }}
                                type='checkbox' />
                        </Box>
                    </FormikStep>
                    <FormikStep stepName='Playtime' validationSchema={step2Schema}>
                        <Box>
                            <Field
                                name="hoursPlayed"
                                component={TextField}
                                label="Hours Played"
                                type='number' />
                        </Box>
                    </FormikStep>
                    <FormikStep stepName='Extra Info' validationSchema={step3Schema}>
                        <Box>
                            <Field
                                name="comments"
                                component={TextField}
                                label="Comments" />
                        </Box>
                    </FormikStep>
                </FormikStepper>
            </CardContent>
        </Card>
    )
}

export default Multistep
