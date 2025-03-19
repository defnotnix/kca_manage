"use client";

import {
  Badge,
  Group,
  Paper,
  SimpleGrid,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { Icon } from "@phosphor-icons/react";

export function StatCard({
  title,
  icon,
  value,
  shortValue,
  description,
  color,
}: {
  title?: string;
  icon?: Icon;
  value?: string;
  shortValue?: string;
  description?: string;
  color?: string;
}) {
  const CardIcon: any = icon;

  return (
    <Paper withBorder p="md" radius="md">
      <Group justify="space-between">
        <Text size="sm" c="dimmed">
          {title}
        </Text>
        <ThemeIcon variant="light" color={color}>
          <CardIcon />
        </ThemeIcon>
      </Group>

      <Group align="flex-end" gap="xs" mt={"xs"}>
        <Text size="2rem" fw={700}>
          {value}
        </Text>
      </Group>

      <Group justify="space-between">
        <Text fz="xs" c="dimmed" mt={7}>
          {description}
        </Text>

        {shortValue && <Badge variant="light" size="xs">{shortValue}</Badge>}
      </Group>
    </Paper>
  );
}
