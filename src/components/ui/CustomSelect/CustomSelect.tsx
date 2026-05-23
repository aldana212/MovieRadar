import Select, { components } from "react-select";
import type {
  StylesConfig,
  SingleValue,
  ActionMeta,
  ControlProps,
  DropdownIndicatorProps,
} from "react-select";

import { useMobile } from "../../../hooks/useMobile";

/* =====================<SelectOption | null>====
   TYPES
========================= */

export type SelectOption = {
  label: string;
  value: string | number;
};

type CustomSelectProps = {
  options: SelectOption[];
  value: SelectOption | null;
  onChange: (
    newValue: SingleValue<SelectOption>,
    actionMeta: ActionMeta<SelectOption>,
  ) => void;
  icono?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
};

/* =========================
   STYLES
========================= */

const getSelectStyles = (): StylesConfig<SelectOption, false> => {
  return {
    control: (provided) => ({
      ...provided,
      padding: 0,
      backgroundColor: "#051424",
      borderColor: "#374151",
      boxShadow: "none",
    }),

    menu: (provided) => ({
      ...provided,
      border: "none",
      borderRadius: "8px",
      backgroundColor: "#051424",
      padding: "5px",
      zIndex: 15
    }),

    option: (provided, state) => ({
      ...provided,
      borderRadius: "8px",
      backgroundColor:
        state.isSelected || state.isFocused ? "#374151" : "transparent",
      "&:hover": {
        backgroundColor: "#374151",
      },
      color: "#E5E7EB",
      padding: "10px",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: state.isSelected ? 600 : 400,
    }),

    singleValue: (provided) => ({
      ...provided,
      color: "#E5E7EB",
      fontSize: "14px",
      fontWeight: 500,
    }),

    placeholder: (provided) => ({
      ...provided,
      color: "#94A3B8",
      fontSize: "14px",
      fontWeight: 500,
    }),

    input: (provided) => ({
      ...provided,
      color: "#E5E7EB",
      fontSize: "14px",
    }),

    valueContainer: (base) => ({
      ...base,
      padding: 0,
      overflow: "hidden",
    }),

    dropdownIndicator: (base, state) => ({
      ...base,
      padding: 0,
      transition: "all .2s ease",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : undefined,
    }),
  };
};

/* =========================
   CUSTOM CONTROL
========================= */

const CustomControl = ({
  children,
  ...props
}: ControlProps<SelectOption, false>) => {
  return (
    <div
      {...props.innerProps}
      className="w-full h-[40px] flex items-center gap-2 bg-[#051424] border border-[#374151] rounded-[8px] px-[12px]"
    >
      {children}
    </div>
  );
};

/* =========================
   DROPDOWN INDICATOR
========================= */
const DropdownIndicator = (
  props: DropdownIndicatorProps<SelectOption, false>,
) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-gray-400">
        <path
          d="M6 9L12 15L18 9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </components.DropdownIndicator>
  );
};

/* =========================
   COMPONENT
========================= */
const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  disabled,
}: CustomSelectProps) => {
  const { isMobile } = useMobile();

  return (
    <Select<SelectOption, false>
      options={options}
      value={value}
      onChange={onChange}
      styles={getSelectStyles()}
      placeholder={placeholder}
      isDisabled={disabled}
      components={{
        Control: CustomControl,
        DropdownIndicator,
        IndicatorSeparator: () => null,
      }}
      menuPlacement={isMobile ? "top" : "bottom"}
    />
  );
};

export default CustomSelect;
