"use client";

import {
  Anchor,
  Box,
  Center,
  Container,
  Divider,
  Image,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  Text,
} from "@mantine/core";
import { PropsWithChildren } from "react";

import imgLogo from "@/assets/images/brand/mainLogo.png";
import { CaretDown } from "@phosphor-icons/react";

export default function BookingLayout({ children }: PropsWithChildren) {
  return (
    <Box
      style={{
        minHeight: "110vh",
        background: "var(--mantine-color-gray-1)",
        marginTop: "-10vh",
        paddingTop: "10vh",
      }}
    >
      <Center mt="xl">
        <Image alt="KCA" h={50} fit="contain" src={imgLogo.src} />
      </Center>

      <Text mt={32} ta="center" size="3rem" fw={700}>
        Ground Booking
      </Text>
      <Center mt="xl">
        <CaretDown />
      </Center>

      {children}

      <Paper radius={0} bg="dark.9" py="xl" mt={200}>
        <Container size="md" py={100}>
          <Text c="gray.0" size="3rem">
            Cricket is
            <br />
            for everyone.
          </Text>

          <Space h={64} />

          <SimpleGrid cols={{ base: 1, lg: 3 }}>
            <Stack gap={4}>
              <Text size="xl" fw={800} c="gray.0">
                Address
              </Text>
              <Text size="lg" c="gray.0">
                Near Karuna Hospital
                <br />
                Budhanilkantha, Kathmandu
              </Text>
            </Stack>

            <Stack gap={4}>
              <Text size="xl" fw={800} c="gray.0">
                Socials
              </Text>

              <Stack gap={0}>
                <Anchor c="gray.0">Facebook</Anchor>
                <Anchor c="gray.0">Twitter</Anchor>
                <Anchor c="gray.0">Instagram</Anchor>
              </Stack>
            </Stack>

            <Stack gap={4}>
              <Text size="xl" fw={800} c="gray.0">
                Say Hello
              </Text>
              <Text size="lg" c="gray.0">
                info@kathmanducricketacademy.com.np
                <br />
                +977 - 981234123
              </Text>
            </Stack>
          </SimpleGrid>

          <Divider my={50} opacity={0.3} />

          <Text size="sm" c="gray.0">
            Kathmandu Cricket Academy © 2025. All Rights Reserved.
          </Text>
        </Container>
      </Paper>
    </Box>
  );
}
