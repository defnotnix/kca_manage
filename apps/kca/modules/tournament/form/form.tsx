"use client";

import React, {useState} from "react";
//mantine
import {
    ActionIcon,
    Badge,
    Box,
    Button,
    Center,
    Checkbox,
    Divider,
    FileButton,
    FileInput,
    Grid,
    Group,
    Image,
    MultiSelect,
    NumberInput,
    Paper,
    Pill,
    PillsInput,
    Radio,
    Select,
    SimpleGrid,
    Stack,
    Text,
    Textarea,
    TextInput,
} from "@mantine/core";
//framework
import {FormHandler} from "@vframework/core";
import {FormElement, ImageUpload} from "@vframework/ui";
import {DateInput, YearPickerInput} from "@mantine/dates";

import {useQuery} from "@tanstack/react-query";

import classes from "./form.module.css";
import {Plus, Trash} from "@phosphor-icons/react";

// Assuming you have these defined elsewhere

export function _Form() {
    // * DEFINITIONS

    const form = FormHandler.useForm();

    // * CONTEXT

    const {current} = FormHandler.usePropContext();

    //  const current: number = 3;

    // * STATES

    // * PRELOADING

    // * FUNCTIONS

    // * COMPONENTS

    switch (current) {
        case 0:
            return (
                <>
                    <Stack gap="xs" p="md">
                        <Stack gap="xs">
                            <FormElement.SectionTitle
                                isTopElement
                                title="Tournament Details"
                                description="Comprehensive details on the tournament"
                            />


                            <TextInput
                                label="Tournament Name"
                                placeholder="e.g. KCA Annual Tournament"
                                description="Enter type of your product"
                                {...form.getInputProps("name")}
                            />
                            <TextInput
                                label="Tournament Location"
                                placeholder="e.g. Budhanilkantha, Kathmandu"
                                description="Enter type of your product"
                                {...form.getInputProps("location")}
                            />
                            <SimpleGrid cols={2} spacing="xs">
                                <DateInput
                                    label="Start Date"
                                    placeholder="Select Start Date"
                                    description="Enter type of your product"
                                    {...form.getInputProps("start_date")}
                                />
                                <DateInput
                                    label="End Date"
                                    placeholder="Select End Date"
                                    description="Enter type of your product"
                                    {...form.getInputProps("end_date")}
                                />
                            </SimpleGrid>
                        </Stack>
                    </Stack>
                </>
            );
    }
}
