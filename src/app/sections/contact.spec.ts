import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import emailjs from '@emailjs/browser';
import { configureZonelessTestBed } from '../../testing/test-setup';
import { Contact } from './contact';

describe('Contact', () => {
  beforeEach(() => {
    configureZonelessTestBed({ imports: [Contact] });
  });

  function setup() {
    const fixture = TestBed.createComponent(Contact);
    fixture.detectChanges();
    return fixture;
  }

  function fillForm(
    fixture: ReturnType<typeof setup>,
    values: { name?: string; email?: string; message?: string },
  ) {
    const inputs = {
      name: fixture.debugElement.query(By.css('#c-name'))
        .nativeElement as HTMLInputElement,
      email: fixture.debugElement.query(By.css('#c-email'))
        .nativeElement as HTMLInputElement,
      message: fixture.debugElement.query(By.css('#c-msg'))
        .nativeElement as HTMLTextAreaElement,
    };
    if (values.name !== undefined) {
      inputs.name.value = values.name;
      inputs.name.dispatchEvent(new Event('input'));
    }
    if (values.email !== undefined) {
      inputs.email.value = values.email;
      inputs.email.dispatchEvent(new Event('input'));
    }
    if (values.message !== undefined) {
      inputs.message.value = values.message;
      inputs.message.dispatchEvent(new Event('input'));
    }
  }

  it('creates the form with name, email and message controls, all required', async () => {
    const fixture = setup();
    await fixture.whenStable();

    const form = fixture.componentInstance['form'];
    expect(form.contains('name')).toBe(true);
    expect(form.contains('email')).toBe(true);
    expect(form.contains('message')).toBe(true);
    expect(form.valid).toBe(false);
  });

  it('does not show errors before the user interacts with a field', async () => {
    const fixture = setup();
    await fixture.whenStable();

    const errors = fixture.debugElement.queryAll(By.css('.ct__error'));
    expect(errors.length).toBe(0);
  });

  it('shows a required error once a field is touched and left empty', async () => {
    const fixture = setup();
    await fixture.whenStable();

    const nameInput = fixture.debugElement.query(By.css('#c-name'))
      .nativeElement as HTMLInputElement;
    nameInput.dispatchEvent(new Event('blur'));
    fixture.componentInstance['form'].get('name')?.markAsTouched();
    await fixture.whenStable();

    const error = fixture.debugElement.query(By.css('.ct__error'));
    expect(error).toBeTruthy();
  });

  it('shows an invalid-email error for a malformed email once touched', async () => {
    const fixture = setup();
    fillForm(fixture, { email: 'not-an-email' });
    fixture.componentInstance['form'].get('email')?.markAsTouched();
    await fixture.whenStable();

    const emailControl = fixture.componentInstance['form'].get('email');
    expect(emailControl?.hasError('email')).toBe(true);
  });

  it('does not submit an invalid form and marks all controls as touched', async () => {
    const fixture = setup();
    await fixture.whenStable();

    const sendSpy = vi.spyOn(emailjs, 'send');
    const form = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    await fixture.whenStable();

    expect(sendSpy).not.toHaveBeenCalled();
    expect(fixture.componentInstance['form'].get('name')?.touched).toBe(true);
  });

  it('submits a valid form via emailjs and shows the success state', async () => {
    const fixture = setup();
    fillForm(fixture, {
      name: 'Makaruos',
      email: 'makaruos@example.com',
      message: 'Hello there, this is a test message.',
    });
    await fixture.whenStable();

    const sendSpy = vi
      .spyOn(emailjs, 'send')
      .mockResolvedValue({ status: 200, text: 'OK' } as never);

    const form = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    await fixture.whenStable();

    expect(sendSpy).toHaveBeenCalledTimes(1);
    expect(fixture.componentInstance['sent']()).toBe(true);
    expect(fixture.componentInstance['sending']()).toBe(false);
    expect(fixture.componentInstance['failed']()).toBe(false);
  });

  it('shows the failed state when emailjs.send() rejects', async () => {
    const fixture = setup();
    fillForm(fixture, {
      name: 'Makaruos',
      email: 'makaruos@example.com',
      message: 'Hello there, this is a test message.',
    });
    await fixture.whenStable();

    vi.spyOn(emailjs, 'send').mockRejectedValue(new Error('network error'));

    const form = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement;
    form.dispatchEvent(new Event('submit'));
    await fixture.whenStable();

    expect(fixture.componentInstance['failed']()).toBe(true);
    expect(fixture.componentInstance['sending']()).toBe(false);
    expect(fixture.componentInstance['sent']()).toBe(false);
  });
});
