import React, { useEffect } from 'react'
import { useField, useFormikContext } from 'formik'
import {
  Input as TextInput,
  Label,
  Select as SelectInput,
  Switch as SwitchInput,
  Textarea as TextareaInput,
} from './FormInputs'
import { Text } from './Text'
import { Box } from './Box'
import { border } from '../theme'
import { Row } from './Row'
import { Icon } from './Icon'
import { Clickable } from './Clickable'

export { Formik, Form } from 'formik'

const ErrorMessage = ({ meta }) =>
  meta.touched && meta.error ? (
    <Text color="error" mt={1} fontSize={0} mb={1}>
      {meta.error}
    </Text>
  ) : null

const FiledWrapper = ({ children, meta, field, fieldProps }) => {
  const hasError = meta.touched && meta.error
  return (
    <Box mb={hasError ? 0 : 3} minWidth={['100%', 300]}>
      <Label htmlFor={fieldProps.id || fieldProps.name}>{fieldProps.label}</Label>
      <Row
        bg={fieldProps.disabled ? 'grey2' : 'inherit'}
        {...border('grey3', 'default')}
        alignItems="center"
        p={2}
      >
        {fieldProps.leftIcon && (
          <Box mr={1}>
            <Icon icon={fieldProps.leftIcon} color="grey4" />
          </Box>
        )}
        {fieldProps.leftComponent && <Box mr={1}>{fieldProps.leftComponent()}</Box>}
        <Box flexGrow={1}>{children}</Box>
      </Row>
      <ErrorMessage meta={meta} />
    </Box>
  )
}

export const Hidden = (p) => {
  const props = {type: 'hidden', ...p}
  const [field, meta] = useField(props)
  return (
    <TextInput {...field} {...props} />
  )
}

export const Input = (props) => {
  const [field, meta] = useField(props)
  return (
    <FiledWrapper fieldProps={props} field={field} meta={meta}>
      <TextInput {...field} {...props} />
    </FiledWrapper>
  )
}

export const Textarea = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <Box mt={2}>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <TextareaInput {...field} {...props} />
      <ErrorMessage meta={meta} />
    </Box>
  )
}

export const Select = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props)

  useEffect(() => {
    if(meta.initialValue) {
      console.log(meta.initialValue)
      helpers.setValue(props.options.find(o => o.value === meta.initialValue))
    }
  }, [])

  return (
    <Box mt={2}>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <SelectInput {...field} onChange={(item) => helpers.setValue(item)} {...props} />
      <ErrorMessage meta={meta} />
    </Box>
  )
}

export const RevealContent = ({children, label, ...props}) => {
  const [field, meta, helpers] = useField({type: 'checkbox', ...props})

  return (
    <Box mt={2}>
      <Clickable onClick={() => helpers.setValue(!field.checked)}>
        <Row >
          <SwitchInput {...field} {...props} />
          <Label htmlFor={props.id || props.name} ml={2}>{label}</Label>
        </Row>
      </Clickable>
      <Box mt={2}>
        {field.checked && children}
      </Box>
    </Box>
  )
}

export const Switch = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <Box mt={2}>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <SwitchInput {...field} {...props} />
      <ErrorMessage meta={meta} />
    </Box>
  )
}
