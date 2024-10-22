declare namespace Express {
    interface Request {
      user?: {
        user_id: number;
        username: string;
      };
    }
  }
