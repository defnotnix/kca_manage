import { Container, Paper, Text, ThemeIcon } from "@mantine/core";
import { Check, CheckCircle, CheckSquare } from "@phosphor-icons/react";

export default function ClientBookingSuccess() {
  return (
    <>
      <Container size="xs">
        <Paper p="xl" my={32}>
          <Text size="lg" ta="center">
            You're booking is successful!
            <br /> We will contact you shortly.
          </Text>
        </Paper>
      </Container>
    </>
  );
}
