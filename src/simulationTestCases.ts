export interface CircuitTestCase {
  id: string;
  description: string;
  setup: {
    R2: number;
    ground: boolean;
    voltage: number;
  };
  expected: {
    failure: boolean;
    errorType: string;
    message: string;
  };
}

export const testCases: CircuitTestCase[] = [
  {
    id: "wrong-value-missing-ground",
    description: "Combined Test Case: Wrong Value with Missing Ground",
    setup: {
      R2: 10,
      ground: false,
      voltage: 5
    },
    expected: {
      failure: true,
      errorType: "overheat",
      message: "Extreme current/voltage imbalance; R2 power could exceed 0.5W quickly, simulating failure or burnout."
    }
  }
]; 