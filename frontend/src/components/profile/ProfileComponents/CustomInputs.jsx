import { Box, TextField } from "@mui/material";

export default function CustomInput({
  id,
  title,
  name,
  value,
  onChange,
  dis,
  req,
  type,
  InputProps,
  select,
  content,
}) {
  return (
    <Box>
      <TextField
        fullWidth
        margin="dense"
        size="small"
        id={id}
        label={title}
        name={name}
        value={value}
        onChange={onChange}
        disabled={dis}
        required={req}
        type={type}
        InputProps={InputProps}
        select={select}
      >
        {content && content}
      </TextField>
    </Box>
  );
}
