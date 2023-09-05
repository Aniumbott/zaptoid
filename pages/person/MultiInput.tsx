// Import Modules
import { Button, TextInput } from "@mantine/core";
import { IconX, IconPlus } from "@tabler/icons-react";
import { useState } from "react";

// Export Module
export default function MultiInput(props: { existing: String[] }) {
  const { existing } = props;
  const [inputs, setInputs] = useState<String[]>(existing || [""]);
  return (
    <>
      <div className="multi-input-container">
        {inputs.map((input, key) => {
          return (
            <div className="inputs" key={key}>
              <TextInput
                value={`${input}`}
                onChange={(event) => {
                  const newInputs = [...inputs];
                  newInputs[key] = event.currentTarget.value;
                  setInputs(newInputs);
                }}
                style={{ width: "100%", marginRight: "1rem" }}
                radius="md"
              />
              <Button
                color="red"
                variant="light"
                onClick={() => {
                  const newInputs = [...inputs];
                  newInputs.splice(key, 1);
                  setInputs(newInputs);
                }}
                radius="md"
              >
                <IconX />
              </Button>
            </div>
          );
        })}
        <Button
          onClick={() => {
            if (inputs.length < 5) {
              setInputs([...inputs, ""]);
            } else {
              alert("Maximum 5 are allowed");
            }
          }}
          variant="light"
          radius="md"
        >
          <IconPlus />
        </Button>
      </div>
      <style jsx>{`
        .multi-input-container {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: right;
        }
        .inputs {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          width: 100%;
          margin-bottom: 1rem;
        }
      `}</style>
    </>
  );
}
