import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocuwareComponent } from './docuware.component';

describe('DocuwareComponent', () => {
  let component: DocuwareComponent;
  let fixture: ComponentFixture<DocuwareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocuwareComponent]
    });
    fixture = TestBed.createComponent(DocuwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
