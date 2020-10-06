import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { TableCell } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectComponent(props) {
  const classes = useStyles();
  const { choices, label, name, useObjectAsValue } = props;
  const [state, setState] = React.useState(-1);

  const handleChange = (event) => {
    setState(event.target.value);
    props.onChange(event);
  };

  return (

    <FormControl className={classes.formControl}>
    
      <InputLabel htmlFor="choice-native-simple">{label}</InputLabel>
      <Select
        native
        value={state}
        onChange={handleChange}
        inputProps={{
          name: props.name,
          id: 'choice-native-simple',
        }}
      >
        <option aria-label="None" value={label} />
        {choices && (
          choices.map((choice, i) => {
            if (useObjectAsValue === true) {
              return (<option key={i} value={choice}>{choice}</option>)
            } else {
              return (<option key={i} value={choice.id}>{choice.name}</option>)
            }
          })
        )
        }
      </Select>
    
    </FormControl>

  );
}
