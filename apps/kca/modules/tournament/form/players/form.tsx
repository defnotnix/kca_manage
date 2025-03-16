"use client";

import React, {useEffect, useState} from "react";
//mantine
import {
    ActionIcon,
    Avatar,
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
    Space,
    Stack,
    Text,
    Textarea,
    TextInput,
} from "@mantine/core";
//framework
import {FormHandler} from "@vframework/core";
import {FormElement, ImageUpload, triggerNotification} from "@vframework/ui";
import {DateInput, TimeInput, YearPickerInput} from "@mantine/dates";

import {useMutation, useQuery} from "@tanstack/react-query";

import classes from "./form.module.css";
import {Plus, Trash, Warning} from "@phosphor-icons/react";
import {Form} from "@mantine/form";
import {modals} from "@mantine/modals";
import {getRecords as getAllPlayers} from "@/modules/players/module.api";
import {createRecord, deleteRecord, getRecords, updateRecord} from "./form.api";

// Assuming you have these defined elsewhere

export function _FormPlayer({active}: any) {
    // * DEFINITIONS

    // * CONTEXT

    //  const current: number = 3;

    // * STATES

    // * PRELOADING

    const queryData: any = useQuery({
        queryKey: ["session", "players"],
        queryFn: async () => {
            const res = await getAllPlayers({
                endpoint: "/players/info/drop/",
            });
            return res;
        },
    });

    const queryDataPlayers: any = useQuery({
        queryKey: ["session", "tournament", "players"],
        queryFn: async () => {
            const res = await getRecords({
                endpoint: "/players/tournament/" + active.id + "/"
            });
            console.log(res);
            return res?.player || [];
        },
    });

    // * FUNCTIONS

    // * MUTATIONS

    const mutationAdd = useMutation({
        mutationFn: async (id) => {
            triggerNotification.form.isLoading({});
            const res = updateRecord({
                tournament: active.id,
                player: [id],
            }, active.id);
            return res;
        },
        onSuccess: (res: any, id: any) => {
            queryDataPlayers.refetch();
            triggerNotification.form.isSuccess({});
            queryData.refetch();
        },
        onError: (err: any) => {
            triggerNotification.form.isError({});
        },
    });

    const mutationSubmit = useMutation({
        mutationFn: async (delId) => {
            triggerNotification.form.isLoading({});
            const res = await deleteRecord(delId);
            return res;
        },
        onSuccess: (res: any, delId: any) => {
            queryDataPlayers.refetch();
            triggerNotification.form.isSuccess({});
            queryData.refetch();
        },
        onError: (err: any) => {
            triggerNotification.form.isError({});
        },
    });

    const handleDelete = (id: any) => {
        modals.openConfirmModal({
            title: (
                <Group>
                    <ActionIcon size="sm" color="red" variant="light">
                        <Warning size={12}/>
                    </ActionIcon>
                    <Text
                        size="sm"
                        style={{
                            fontWeight: 600,
                        }}
                    >
                        Please confirm your action
                    </Text>
                </Group>
            ),
            children: (
                <>
                    <Text size="xs" my="md">
                        This student will be removed from the session, along with any
                        associated attendance records and reports.
                        <br/>
                        <br/>
                        <span
                            style={{
                                fontWeight: 600,
                            }}
                        >
              Are you sure you want to proceed?
            </span>
                    </Text>
                    <Space h="6px"/>
                </>
            ),
            labels: {confirm: "Confirm", cancel: "Cancel"},
            confirmProps: {
                color: "red",
                size: "xs",
            },
            cancelProps: {
                size: "xs",
            },
            onCancel: () => {
            },
            onConfirm: () => {
                mutationSubmit.mutate(id);
            },
            styles: {
                header: {
                    background: "var(--mantine-color-red-1)",
                },
            },
            size: "sm",
        });
    };

    // * COMPONENTS

    return (
        <>
            <Stack gap="xs" p="md">
                <FormElement.SectionTitle
                    isTopElement
                    title="Session Players"
                    description="Add the players who will be attending this session."
                />

                <Select
                    data={queryData.data?.map((playerinfo: any, index: number) => {
                        return {
                            value: String(playerinfo.id),
                            label: `${playerinfo.name}`,
                            disabled: queryDataPlayers?.data?.find(
                                (iteminfo: any) => iteminfo.id === playerinfo.id
                            )?.player?.id,
                        };
                    })}
                    placeholder="Select student to add"
                    onChange={(e) => {
                        mutationAdd.mutate(e);
                    }}
                />

                {queryDataPlayers?.data?.length > 0 ? (
                    <>
                        <SimpleGrid cols={3} spacing="xs">
                            {queryDataPlayers?.data.map((iteminfo: any, index: number) => (
                                <Paper
                                    key={index}
                                    withBorder
                                    pos="relative"
                                    className={classes.playercard}
                                >
                                    <ActionIcon
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                        }}
                                        variant="filled"
                                        color="red"
                                        onClick={() => {
                                            handleDelete(iteminfo.id);
                                        }}
                                    >
                                        <Trash/>
                                    </ActionIcon>

                                    <Paper bg="brand.0">
                                        <Image h={160} src={iteminfo.image}/>
                                    </Paper>

                                    <Box p="md">
                                        <Text size="md">{iteminfo.name}</Text>

                                    </Box>
                                </Paper>
                            ))}
                        </SimpleGrid>
                    </>
                ) : (
                    <>
                        <Text size="xs" opacity={0.5} my="md">
                            You have not added any players to this session yet
                        </Text>
                    </>
                )}
            </Stack>
        </>
    );
}
