import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IcaContractBuilderNewComponent } from './ica-contract-builder-new.component';

describe('IcaContractBuilderNewComponent', () => {
  let component: IcaContractBuilderNewComponent;
  let fixture: ComponentFixture<IcaContractBuilderNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IcaContractBuilderNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IcaContractBuilderNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
