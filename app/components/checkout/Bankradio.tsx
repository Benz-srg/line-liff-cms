import React, { Dispatch, SetStateAction } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { numberWithDat } from "@/utils/service";

interface bank {
  _id: string;
  account: string;
  bankName: string;
  bankAccountName: string;
}

interface Props {
  banks: bank[];
  changeBank: string;
  setChangeBank: Dispatch<SetStateAction<string>>;
}

export default function BankRadio({ banks, changeBank, setChangeBank }: Props) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangeBank((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">เลือกธนาคาร</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={changeBank}
        onChange={handleChange}
      >
        {banks.map((bank) => (
          <React.Fragment key={bank._id}>
            <FormControlLabel
              value={bank._id}
              control={<Radio />}
              label={` ${bank.bankName} ${numberWithDat(bank.account)} ${
                bank.bankAccountName
              }`}
            />
          </React.Fragment>
        ))}
      </RadioGroup>
    </FormControl>
  );
}
