#[macro_use] extern crate neon;
#[macro_use] extern crate serde_derive;
#[macro_use] extern crate lazy_static;
extern crate serde_json;
extern crate neon_serde;
extern crate geojson;
extern crate postgres;
extern crate regex;

// Internal Helper Libraries
pub mod stream;
pub mod text;

pub mod types;
pub mod pg;

// Helper to current node fn
pub mod map;

// External PT2ITP Modes
pub mod convert;
pub mod stats;
pub mod dedupe;

pub use self::types::Address;
pub use self::types::Network;
pub use self::types::Context;
pub use self::types::Names;
pub use self::types::Name;
pub use self::text::Tokens;

// Functions registered here will be made avaliable to be called from NodeJS
register_module!(mut m, {
    m.export_function("import_addr", map::import_addr)?;
    m.export_function("import_net", map::import_net)?;

    m.export_function("convert", convert::convert)?;
    m.export_function("stats", stats::stats)?;
    m.export_function("dedupe", dedupe::dedupe)?;
    Ok(())
});
