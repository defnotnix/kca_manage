import { Container, Paper, Text } from "@mantine/core";

export default function ClientBookingSuccess() {
  return (
    <>
      <Container size="xs">
        <Paper p="xl" my={32}>
          <Text size="lg" ta="center">
            The booking is successful!
            <br /> We will contact you shortly.
          </Text>
        </Paper>
      </Container>
    </>
  );
}
