const eitherDisplayTitle = parseJSON(json)
    .flatMap(data => data ? Right(data) : Left(Err.EmptyJson))
    .flatMap(data => data.title ? Right(data.title) : Left(Err.NoTitle))
    .map(title => `Title: "${ title }"`);