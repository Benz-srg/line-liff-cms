import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({
  value,
  setValue,
  products,
  title,
  className,
}) {
  return (
    <Autocomplete
      className={className}
      multiple
      id="checkboxes-tags-demo"
      options={products}
      disableCloseOnSelect
      onChange={(event, newValue) => {
        let newArr = [];
        newArr = newValue;
        setValue({ ...value, relatedIds: newArr });
      }}
      getOptionLabel={(option: any) => option.title}
      renderOption={(option: any, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.title}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={title}
          placeholder="กรอกค้นหาสินค้า"
        />
      )}
    />
  );
}
