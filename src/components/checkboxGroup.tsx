import { CheckboxGroup, Checkbox } from "@nextui-org/react";

export default function CheckboxGroups({ data, label, setCheckbox }: any) {
  return (
    <CheckboxGroup
      label={label}
      orientation="horizontal"
      isRequired
      color="primary"
      onChange={(e) => setCheckbox(e)}
    >
      {data.map((item: any) => {
        return <Checkbox key={ item.key } value={item.key}>{item.label}</Checkbox>;
      })}
    </CheckboxGroup>
  );
}
