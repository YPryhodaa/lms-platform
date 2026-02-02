import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Створення аккаунту</CardTitle>
        <CardDescription>
          Введіть вашу інформацію нижче для створення вашого аккаунту
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Повне ім'я</FieldLabel>
              <Input id="name" type="text" placeholder="John Doe" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Електронна пошта</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" required />
              <FieldDescription>
                Має бути принаймні 8 символів.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Підтвердіть пароль
              </FieldLabel>
              <Input id="confirm-password" type="password" required />
              <FieldDescription>Будь ласка, підтвердіть ваш пароль.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Створення аккаунту</Button>
                <Button variant="outline" type="button">
                  Зареєструватися з Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Вже маєте аккаунт? <a href="#">Вхід</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
