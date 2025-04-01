"use client";

import { Badge, Group, Paper, Text, ThemeIcon } from "@mantine/core";
import { Icon } from "@phosphor-icons/react";

interface StatCardProps {
  title?: string;
  icon?: Icon;
  value?: string;
  shortValue?: string;
  description?: string;
  color?: string;
}

export function StatCard({
  title,
  icon: CardIcon, // Rename destructured prop to avoid reassignment
  value,
  shortValue,
  description,
  color,
}: StatCardProps) {
  return (
    <Paper withBorder p="md" radius="md">
      <Group justify="space-between">
        <Text size="sm" c="dimmed">
          {title}
        </Text>
        <ThemeIcon variant="light" color={color}>
          {CardIcon && <CardIcon />}
        </ThemeIcon>
      </Group>

      <Group align="flex-end" gap="xs" mt="xs">
        <Text size="2rem" fw={700}>
          {value}
        </Text>
      </Group>

      <Group justify="space-between">
        <Text fz="xs" c="dimmed" mt={7}>
          {description}
        </Text>

        {shortValue && (
          <Badge variant="light" size="xs">
            {shortValue}
          </Badge>
        )}
      </Group>
    </Paper>
  );
}
