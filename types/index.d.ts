// Enumerations

export enum BaggageType {
  Piece = "PC",
  Kilogram = "KG",
}

export enum BookingStatus {
  New = "NEW",
  Complete = "COMPLETE",
  Cancelled = "CANCELLED",
  Refund = "REFUND",
}

export enum DocumentType {
  Internal = "INTERNAL",
  Foreign = "FOREIGN",
  Passport = "PASSPORT",
  BirthCertificate = "BIRTHDAY_NOTIFICATION",
  OfficerID = "OFFICERID",
  MilitaryID = "MILITARYID",
  SeamansID = "SEAMANSID",
  ReturnID = "RETURNID",
}

export enum FlightSorting {
  Price = "price",
  Duration = "duration",
}

export enum Gender {
  Male = "MALE",
  Female = "FEMALE",
}

export enum LocomotionMethod {
  Avia = "AVIA",
  Bus = "BUS",
  Train = "TRAIN",
}

export enum MessageSource {
  Request = "REQUEST",
  Build = "BUILD",
  Operation = "OPERATION",
  Provider = "PROVIDER",
  Parallel = "PARALLEL",
}

export enum MessageType {
  Notice = "NOTICE",
  Warning = "WARNING",
  Error = "ERROR",
  Debug = "DEBUG",
  ForUser = "FORUSER",
}

export enum OfficeReferenceType {
  Validator = "validator",
  TicketPCC = "ticketPCC",
  BookPCC = "bookPCC",
  SearchPCC = "searchPCC",
  OperatorReference = "operatorReference",
  CRM = "CRM",
  City = "city",
  Country = "country",
}

export enum PassengerType {
  Adult = "ADULT",
  Child = "CHILD",
  Infant = "INFANT",
  Youth = "YOUTH",
  Senior = "SENIOR",
  WSeatInfant = "WSEATINFANT",
  Disabled = "DISABLED",
  DisabledChild = "DISABLEDCHILD",
  Escort = "ESCORT",
  LargeFamily = "LARGEFAMILY",
  StateResident = "STATERESIDENT",
  StateResidentChild = "STATERESIDENTCHILD",
  StateResidentYouth = "STATERESIDENTYOUTH",
  StateResidentSenior = "STATERESIDENTSENIOR",
}

export enum PaymentType {
  Cash = "CASH",
  Invoice = "INVOICE",
}

export enum PhoneType {
  Mobile = "MOBILE",
  Home = "HOME_PHONE",
}

export enum PriceType {
  Tariff = "TARIFF",
  Taxes = "TAXES",
  Discount = "DISCOUNT",
  SborSa = "SBOR_SA",
  DiscSa = "DISC_SA",
  ComisAg = "COMIS_AG",
  ComisSa = "COMIS_SA",
  SborFarf = "SBOR_FARF",
  Fee = "FEE",
  FeeDel = "FEE_DEL",
  Nds = "NDS",
  Penalty = "PENALTY",
}

export enum ReferenceType {
  Locator = "locator",
}

export enum RespondType {
  JSON = "JSON",
  XML = "XML",
}

export enum RuleApplicability {
  Before = "BEFORE",
  After = "AFTER",
  NA = "N/A",
}

export enum RuleType {
  Refund = "REFUND",
  Exchange = "EXCHANGE",
}

export enum ServiceClass {
  Economy = "ECONOMY",
  Business = "BUSINESS",
  First = "FIRST",
  Premium = "PREMIUM",
  PremiumEconomy = "PREMIUMECONOMY",
}

export enum TicketStatus {
  Booking = "BOOKING",
  Sell = "SELL",
  Refund = "REFUND",
}

export enum TicketType {
  All = "ALL",
  Tickets = "ETK",
  Misc = "EMD",
}

// Common Interfaces

interface Descriptor {
  code: string;
  name: string;
}

export interface Carrier extends Descriptor {}
export interface City extends Descriptor {}
export interface Country extends Descriptor {}
export interface Equipment extends Descriptor {}
export interface Location extends Descriptor {}
export interface Terminal extends Descriptor {}

// Interfaces

export interface AirTicket extends Ticket {
  isExtraTicket: boolean;
  isLowcost: boolean;
  isCharter: boolean;
  isSpecial: boolean;
}

export interface Ancillary {
  token: string;
  serviceCode: string;
  serviceGroup: string;
  serviceName: ServiceName;
  confirmationDate: Date;
  total: number;
}

export interface Baggage {
  type?: BaggageType;
  allow?: string;
  value: string;
  descriptions: string[];
}

export interface BenefitCode {
  code: string;
  carrier: Carrier;
}

export interface BookingFile {
  token: string;
  provider: string;
  gds: string;
  terminal: string;
  midoffice: string;
  officeReference: OfficeReference[];
  createDate: string;
  status: BookingStatus;
  paymentType: string;
  reservations: Reservation[];
  customer: Customer;
  documents: string[];
  remarks: string[];
  accompanyingPassengers: Reference[];
  tourCode: TourCode;
  benefitCode: BenefitCode;
  code3D: Code3D;
}

export interface Code3D {
  code: string;
  percent?: number;
  agencyCode?: string;
  contractType?: string;
}

export interface CorporateID {
  accountCode: string;
  tourCode: string;
  companyName: string;
}

export interface Customer {
  name: string;
  email: string;
  countryCode: string;
  areaCode: string;
  phoneNumber: string;
}

export interface DateAndTime {
  date: string;
  time: string;
}

export interface DateSplit {
  departure: DateAndTime;
  arrival: DateAndTime;
}

export interface Document {
  number: string;
  issued: Date;
  expired: Date;
  residence?: Country;
}

export interface EmdTicket extends Ticket {
  ancillary: Ancillary;
}

export interface FareDesc {
  receipt: Receipt;
  discounts: string[];
  rules: Rule[];
}

export interface Fares {
  fareDesc: FareDesc;
  fareSeats: FareSeat[];
  fareTotal: number;
  fareTotalOriginal: FareTotalOriginal;
}

export interface FareSeat {
  passengerType: PassengerType;
  count: number;
  prices: Price[];
  vat: Vat[];
  total: number;
}

export interface FareTotalOriginal {
  elementType?: string;
  amount: number;
  currency: string;
}

export interface Flight {
  token: string;
  segments: Segment[];
  travelDuration?: number;
  seatsAvailable?: number;
}

export interface FlightGroup {
  token: string;
  aggregator?: string;
  carrier: Carrier;
  eticket?: boolean;
  latinRegistration: boolean;
  timeLimit?: Date;
  gds: string;
  terminal?: string;
  allowSSC?: boolean;
  allow3D: boolean;
  itineraries: Itinerary[];
  fares: Fares;
  provider: string;
  untouchable?: boolean;
  isCharter: boolean;
  isSpecial: boolean;
  isLowcost: boolean;
  isHealthCheckRequired: boolean;
  isTourOperator: boolean;
  allowBookWithAccompany: boolean;
  allowBookWithAncillary: boolean;
  virtualInterlining: boolean;
  officeReference: OfficeReference[];
  localPriority: string;
}

export interface Itinerary {
  flights: Flight[];
}

export interface Landing {
  locationCode: Location;
  dateBegin: Date;
  dateEnd: Date;
}

export interface LoyaltyCard {
  id: string;
  carrier: Carrier;
}

export interface Message {
  type: MessageType;
  source?: MessageSource;
  code: number;
  message: string;
}

export interface OfficeReference {
  value: string;
  type: OfficeReferenceType;
}

export interface Passenger {
  token: string;
  passport: Passport;
  loyaltyCard: LoyaltyCard;
  type: PassengerType;
  phoneType: PhoneType;
  phoneNumber: string;
  countryCode: string;
  areaCode: string;
  tariff?: string;
  railwayBonusCardNumber: string;
  email?: string;
  isEmailRefused: boolean;
  isEmailAbsent: boolean;
  extraDocuments: Document[];
}

export interface Passport {
  firstName: string;
  lastName: string;
  middleName?: string;
  citizenship: Country;
  issueCountry: Country;
  issued: Date;
  expired: Date;
  number: string;
  type: DocumentType;
  birthday: Date;
  gender: Gender;
}

export interface Price {
  amount: number;
  currency: string;
  rate?: number;
  amountBase: number;
  currencyBase: string;
  elementType: PriceType;
  code: string;
}

export interface Products {
  airTicket: AirTicket[];
  emdTicket: EmdTicket[];
}

export interface Query {
  context: QueryContext;
}

export interface QueryContext {
  login: string;
  password: string;
  provider: string;
  salePoint?: string;
  currency: string;
  locale: string;
  respondType: RespondType;
  id: number;
  context_id?: number;
}

export interface Receipt {
  barcode: string;
  endorsements: string[];
  fareCalculations: string[];
  operatorReference?: string;
}

export interface Reference {
  type: ReferenceType;
  value: string;
}

export interface Reservation {
  token: string;
  recordLocator: string;
  regLocator: string;
  date: Date;
  timeLimit: Date;
  products: Products;
  isExtraTicket: boolean;
}

export interface Result {
  token: string;
  messages: Message[];
  context: ResultContext;
}

export interface ResultContext {
  version: string;
  environment: string;
  profile: string;
  provider?: string | string[];
  executionTimeReport: Record<string, string>;
}

export interface RouteSegment {
  locationBegin: Location;
  locationEnd: Location;
  date: Date;
}

export interface Rule {
  type?: RuleType;
  allowed: boolean;
  applicability?: RuleApplicability;
  penalty?: string;
  descriptions: string[];
}

export interface Seat {
  passengerType: PassengerType;
  count: number;
}

export interface Segment {
  token: string;
  serviceClass: ServiceClass;
  bookingClass: string;
  fareBasis: string;
  brandName: string;
  carrier: Carrier;
  marketingCarrier: Carrier;
  operatingCarrier: Carrier;
  equipment: Equipment;
  methLocomotion: LocomotionMethod;
  dateBegin: Date;
  dateEnd: Date;
  flightNumber: string;
  terminalBegin?: Terminal;
  locationBegin: Location;
  cityBegin: City;
  countryBegin: Country;
  terminalEnd?: Terminal;
  locationEnd: Location;
  cityEnd: City;
  countryEnd: Country;
  starting: boolean;
  connected: boolean;
  travelDuration: number;
  baggage: Baggage;
  carryOn: Baggage;
  regLocator: string;
  landings: Landing[];
  seatsLeft?: string;
  dateSplit?: DateSplit;
}

export interface ServiceName {
  original: string;
  transcript: string;
}

export interface State<TQuery = Query, TResult = Result> {
  id: string;
  sessionId: string;
  baseUri: string;
  endpoint: string;
  query: TQuery;
  result: TResult;
  attrs: Record<string, any>;
}

interface Ticket {
  token: string;
  carrier: Carrier;
  eticket: number;
  issueDate: Date;
  recordLocator: string;
  regLocator: string;
  status: TicketStatus;
  number: string;
  exchangeNumber: string;
  passenger: Passenger;
  itineraries: Itinerary[];
  fares: Fares;
}

export interface TourCode {
  code: string;
  carrier: Carrier;
}

export interface Vat {
  code: string;
  amount: number;
  percent: number;
  rate: number;
  currency: string;
  amountBase: number;
  currencyBase: string;
}

// Queries/Results

export interface SearchQuery extends Query {
  parameters: {
    route: RouteSegment[];
    seats: Seat[];
    serviceClass: ServiceClass;
    skipConnected?: boolean;
    eticketsOnly?: boolean;
    mixedVendors?: boolean;
    preferredAirlines?: Carrier[];
    ignoredAirlines?: Carrier[];
    preferredFlights?: string[];
    code3D?: Code3D;
    sort?: FlightSorting;
    limit?: number;
  };
}

export interface SearchResult extends Result {
  flightGroups: FlightGroup[];
  initTime?: string;
}

export type SearchState = State<SearchQuery, SearchResult>;

export interface SelectQuery extends Query {
  parameters: {
    token: string;
    flightGroups: [
      {
        token: string;
        itineraries: [
          {
            token: string;
            flights: [
              {
                token: string;
              },
            ];
          },
        ];
      },
    ];
    corporateID?: CorporateID;
  };
  provider?: string;
  gds?: string;
}

export interface SelectResult extends Result {
  flightGroups: FlightGroup[];
  initTime?: string;
}

export type SelectState = State<SelectQuery, SelectResult>;

export interface BookQuery extends Query {
  parameters: {
    token: string;
    customer: Customer;
    passengers: Passenger[];
    tourCode: TourCode;
    benefitCode: BenefitCode;
    code3D: Code3D;
    isHealthChecked?: boolean;
  };
  provider?: string;
  gds?: string;
}
