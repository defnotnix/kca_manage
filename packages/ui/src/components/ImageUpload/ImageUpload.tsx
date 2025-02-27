// @ts-nocheck

"use client";

import {
  ActionIcon,
  Button,
  Center,
  FileButton,
  Group,
  Image,
  Paper,
  Text,
} from "@mantine/core";
import { ImageSquare, Pen, Pencil, Trash } from "@phosphor-icons/react";
import { useHover } from "@mantine/hooks";
import React, { useEffect, useState } from "react";

export function ImageUpload({
  height = 220,
  error,
  onChange,
  value,
  label,
  description,
  multiple = false,
}: {
  height?: number | string;
  error?: string;
  onChange?: any;
  value?: any;
  label?: string;
  description?: string;
  multiple?: boolean;
}) {
  const { hovered, ref }: any = useHover();

  return (
    <div ref={ref}>
      {!value ? (
        <FileButton onChange={onChange} accept="image/*" multiple={multiple}>
          {(props) => (
            <Paper
              bg="brand.0"
              withBorder
              p="xl"
              {...props}
              style={{
                height: height,
                borderColor: error ? "red" : "",
              }}
            >
              <Group justify="center">
                <ActionIcon variant="light" color="brand">
                  <ImageSquare size={32} />
                </ActionIcon>
              </Group>
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: 600,
                }}
                size="xs"
                color="dimmed"
                mt="md"
              >
                {label || "Upload Media"}
              </Text>
              <Text
                style={{
                  textAlign: "center",
                }}
                size={"xs"}
                color="dimmed"
              >
                {description || "File format : PNG/JPG/JPEG/WEBP"}
              </Text>
              <Group justify="center">
                <Button size="xs" mt="md" mb="xs">
                  Browse
                </Button>
              </Group>

              <Text
                style={{
                  textAlign: "center",
                }}
                size="xs"
                color="dimmed"
              >
                Max size 320KB
              </Text>
            </Paper>
          )}
        </FileButton>
      ) : (
        <FileButton onChange={onChange} accept="image/*">
          {(props) => (
            <Paper withBorder p={16} bg="brand.0">
              <Image
                radius="sm"
                height={Number(height) - 32}
                width={"100%"}
                src={
                  typeof value == "string" ? value : URL.createObjectURL(value)
                }
                fit="contain"
              />
              <Paper
                style={{
                  transition: ".1s ease-in-out",
                  position: "relative",
                  marginTop: -height + 32,
                  width: "100%",
                  height: Number(height) - 32,
                  background: "rgba(0,0,0,0.6)",
                  backdropFilter: "blur(1px)",
                  opacity: hovered ? 1 : 0,
                  zIndex: 99,
                }}
              >
                <Center style={{ height: height }}>
                  <Group>
                    <ActionIcon variant="filled" color="brand" {...props}>
                      <Pencil />
                    </ActionIcon>
                    <ActionIcon
                      variant="filled"
                      color="red"
                      onClick={() => onChange(null)}
                    >
                      <Trash />
                    </ActionIcon>
                  </Group>
                </Center>
              </Paper>
            </Paper>
          )}
        </FileButton>
      )}

      {error && (
        <Text size="xs" color="red" mt="xs">
          {error}
        </Text>
      )}
    </div>
  );
}
