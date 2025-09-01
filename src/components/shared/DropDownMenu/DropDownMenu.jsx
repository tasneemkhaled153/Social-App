import React from 'react'
import { Dropdown, DropdownItem } from "flowbite-react";
export default function DropDownMenu({onEdit,onDelete}) {
  return (
    <Dropdown inline label="">
          <DropdownItem onClick={onEdit}>
              Edit
          </DropdownItem>
          <DropdownItem onClick={onDelete}>
              Delete
          </DropdownItem>
        </Dropdown>
  )
}
