"use client";

import { Box, Divider, Group, Text, UnstyledButton } from "@mantine/core";
import { JSX, ReactNode } from "react";

export function FormElementSectionTitle({
  preTitle,
  title,
  description,
  actionButton,
  isTopElement,
}: {
  preTitle?: string;
  title: string;
  description: string;
  actionButton?: JSX.Element;
  isTopElement?: boolean;
}) {
  return (
    <>
      {!isTopElement && <Divider mt="xl" mb="sm" />}
      <Group wrap="nowrap" justify="space-between">
        <Box>
          <Text size="xs" opacity={0.5}>
            {preTitle}
          </Text>
          <Text size="sm" fw={600}>
            {title}
          </Text>
          <Text size="xs" opacity={0.5}>
            {description}
          </Text>
        </Box>

        {actionButton}
      </Group>
    </>
  );
}
