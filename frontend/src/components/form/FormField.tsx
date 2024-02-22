import { FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

export type FormFieldProps = {
  type?: string
  placeholder: string
  name: string
  form: any
}

const InputFormField: React.FC<FormFieldProps> = ({ type = 'text', placeholder, name, form }) => (
  <>
    {/* <input type={type} placeholder={placeholder} {...register(name, { valueAsNumber })} />
    {error && <span className='error-message'>{error.message}</span>} */}
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className='w-full space-y-1'>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} {...form.register(name)} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </>
)
export default InputFormField
