import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

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
  const {categories} = props;
  const [state, setState] = React.useState(-1);

  const handleChange = (event) => {
    
    setState(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="category-native-simple">Category</InputLabel>
        <Select
          native
          value={state}
        //   defaultValue=""
          onChange={handleChange}
          inputProps={{
            name: 'category',
            id: 'category-native-simple',
          }}
        >
            <option aria-label="None" value="" />
            {categories &&(
                categories.map((category) => {
                return(
                    <option key={category.id} value={category.id}>{category?.name}</option>
                )
            })
            )
        }
        </Select>
      </FormControl>
      
    </div>
  );
}
